import { AuthService } from "../services/auth.service";
import { AppError, successResponse } from "../helpers/response.helper";
import { Request, Response } from "express";

import { RegisterDTO, LoginDTO } from "../dto/auth.dto";

export class AuthController {
    private authService: AuthService

    constructor() {
        this.authService = new AuthService()
    }

    public async register(req: Request, res: Response) {
        const { email, password }: RegisterDTO = req.body
        const avatarFile = req.file // penyimpanan file di multer (sementara)

        if (!email || !password) {
            throw new AppError('Email or password is missing', 400)
        }

        const user = await this.authService.register({
            email,
            password,
            avatar: avatarFile // file diupload ke cloudinary
        })
        successResponse(res, user, 'Success register', 201)
    }

    public async login(req: Request, res: Response) {
        const { email, password }: LoginDTO = req.body

        if (!email || !password) {
            throw new AppError('Email or password is missing', 400)
        }

        const user = await this.authService.login({ email, password })
        successResponse(res, user, 'Success login', 201)
    }

}