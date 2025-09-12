import { Request, Response, NextFunction } from "express";
import { AppError } from "../helpers/response.helper";
import { JWTHelper, TokenPayload } from "../helpers/jwt.helper";

export function authenticate(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization']

    if (!authHeader) {
        throw new AppError('No token provided', 401)
    }

    const token = authHeader.split(" ")[1]

    if (!token) {
        throw new AppError('Invalid token format', 401)
    }

    try {
        const jwtHelper = new JWTHelper()
        const decoded = jwtHelper.verifyToken(token)
        req.user = decoded
        next()
    } catch (error) {
        throw new AppError((error as Error).message, 401)
    }
}

export function authorize(req: Request, res: Response, next: NextFunction) {
    if (req.user.role !== 'SUPERADMIN') {
        throw new AppError('Forbidden: Superadmin only', 403)
    }
    next()
}