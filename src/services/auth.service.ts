import { prisma } from "../config/prisma";
import { RegisterDTO, LoginDTO } from "../dto/auth.dto";
import { hash, compare } from 'bcrypt'
import { AppError } from "../helpers/response.helper";

import { JWTHelper } from "../helpers/jwt.helper";

export class AuthService {
    public async register(data: RegisterDTO) {
        const hashedPassword = await hash(data.password, 10)
        const user = await prisma.profile.create({
            data: {
                email: data.email,
                password: hashedPassword,
                avatar: data.avatar,
                role: 'USER'
            }
        })

        return user
    }

    public async login(data: LoginDTO) {
        const user = await prisma.profile.findUnique({
            where: {
                email: data.email
            }
        })

        if (!user) throw new AppError('Invalid credentials', 400)

        const isValid = await compare(data.password, user.password)

        if (!isValid) throw new AppError('Password not valid', 400)

        // proses generate token setelah pengecekan semuanya
        const jwtHelper = new JWTHelper()
        const token = jwtHelper.generateToken({
            id: Number(user.id),
            email: user.email,
            role: user.role
        })

        return { user, token }
    }
}