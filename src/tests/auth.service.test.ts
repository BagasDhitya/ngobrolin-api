import { AuthService } from '../services/auth.service'
import { AppError } from '../helpers/response.helper'

import { prisma } from '../config/prisma'

// mock semua dependency
jest.mock('../config/prisma')
jest.mock('../helpers/cloudinary.helper')
jest.mock('../helpers/mailer.helper')
jest.mock('../helpers/jwt.helper', () => {
    return {
        JWTHelper: jest.fn().mockImplementation(() => ({
            generateToken: jest.fn().mockReturnValue('mocked.jwt.token'),
        }))
    }
})
jest.mock('bcrypt')

const authService = new AuthService()

describe('AuthService', () => {
    describe('register', () => {
        it('should register a user and send OTP', async () => {

            const mockUser = {
                id: '1',
                email: 'john.doe@example.com',
                password: 'hashed_password',
                role: 'USER'
            }

                ; (prisma.profile.create as jest.Mock).mockResolvedValueOnce(mockUser)
                ; (prisma.otpCode.create as jest.Mock).mockResolvedValueOnce({ id: 'otp1' })


            const result = await authService.register({
                email: 'john.doe@example.com',
                password: '123456',
                role: 'USER',
            })

            expect(result.message).toBe('User registered, OTP sent to email')
            expect(prisma.profile.create).toHaveBeenCalled()
            expect(prisma.otpCode.create).toHaveBeenCalled()
        })
    })

    describe('login', () => {
        it('should login successfully with valid credentials and OTP', async () => {
            const mockUser = {
                id: '1',
                email: 'john.doe@example.com',
                password: '123456',
                role: 'USER'
            }

                ; (prisma.profile.findUnique as jest.Mock).mockResolvedValueOnce(mockUser)
                ; (prisma.otpCode.findFirst as jest.Mock).mockResolvedValueOnce({ id: 'otp1' })
                ; (prisma.otpCode.update as jest.Mock).mockResolvedValueOnce(true)

            const result = await authService.login({
                email: 'john.doe@example.com',
                password: '123456',
                otp: '123456'
            })

            expect(result).toHaveProperty('user')
            expect(result).toHaveProperty('token', 'mocked.jwt.token')
            expect(prisma.otpCode.update).toHaveBeenCalledWith({
                where: { id: 'otp1' },
                data: { used: true }
            })
        })
    })

    it('should throw error if user not found', async () => {
        (prisma.profile.findUnique as jest.Mock).mockResolvedValueOnce(null)

        await expect(authService.login({
            email: 'wrong@example.com',
            password: '123456',
            otp: '123456'
        })).rejects.toThrow(AppError)
    })
})