import jwt from 'jsonwebtoken'
import { AppError } from './response.helper'
import dotenv from 'dotenv'

dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET as string
const JWT_EXPIRES_IN = parseInt(process.env.JWT_EXPIRES_IN as string)

export interface TokenPayload {
    id: string,
    email: string,
    role: 'USER' | 'SUPERADMIN'
}

export class JWTHelper {
    public generateToken(payload: TokenPayload) {
        return jwt.sign(payload, JWT_SECRET, {
            expiresIn: '1d'
        })
    }

    public verifyToken(token: string) {
        try {
            console.log('token : ', token)
            console.log('start verifying ...')
            const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload
            console.log('decoded ; ', decoded)
            return decoded
        } catch (error) {
            throw new AppError('Invalid or expired token', 400)
        }
    }
}