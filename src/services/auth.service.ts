import { hash, compare } from "bcrypt";

import { prisma } from "../config/prisma";
import { RegisterDTO, LoginDTO } from "../dto/auth.dto";

import { AppError } from "../helpers/response.helper";
import { JWTHelper } from "../helpers/jwt.helper";
import { CloudinaryHelper } from "../helpers/cloudinary.helper";
import { MailerHelper } from "../helpers/mailer.helper";

import { otpEmail } from "../types/templates/otpEmail";

const cloudinaryHelper = new CloudinaryHelper()
const mailerHelper = new MailerHelper()

export class AuthService {
    public async register(data: RegisterDTO) {
        const hashedPassword = await hash(data.password, 10)

        let avatarUrl: string | undefined = undefined

        // kalau avatarnya ada, upload ke cloudinary
        if (data.avatar && data.avatar.buffer) {
            avatarUrl = await cloudinaryHelper.uploadImageFromBuffer(data.avatar.buffer, 'avatars')
        }

        // masukkan url avatar yang diproses cloudinary ke db
        const user = await prisma.profile.create({
            data: {
                email: data.email,
                password: hashedPassword,
                avatar: avatarUrl,
                role: data.role
            }
        })

        // Generate OTP
        const otpCode = Math.floor(100000 + Math.random() * 900000).toString()
        const expiredAt = new Date(Date.now() + 5 * 60 * 1000) // kadaluarsa 5 menit

        await prisma.otpCode.create({
            data: {
                code: otpCode,
                expiredAt: expiredAt,
                userId: user.id
            }
        })

        // Kirim ke email user
        const html = otpEmail(otpCode)
        await mailerHelper.sendMail(user.email, 'Account Verification', html)

        return {
            message: 'User registered, OTP sent to email'
        }
    }

    public async login(data: LoginDTO & { otp: string }) {
        const user = await prisma.profile.findUnique({
            where: {
                email: data.email
            }
        })

        if (!user) throw new AppError('Invalid credentials', 400)

        const isValid = await compare(data.password, user.password)

        if (!isValid) throw new AppError('Password not valid', 400)

        // Cek OTP
        const otp = await prisma.otpCode.findFirst({
            where: {
                userId: user.id,
                code: data.otp,
                used: false,
                expiredAt: {
                    gt: new Date()
                }
            }
        })

        if (!otp) throw new AppError('OTP not valid or expired', 400)

        // Tandai OTP sebagai used
        await prisma.otpCode.update({
            where: { id: otp.id },
            data: { used: true }
        })

        // proses generate token setelah pengecekan semuanya
        const jwtHelper = new JWTHelper()
        const token = jwtHelper.generateToken({
            id: user.id,
            email: user.email,
            role: user.role
        })

        return { user, token }
    }
}