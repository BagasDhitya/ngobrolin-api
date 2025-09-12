import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";

export class AuthRouter {
    private router: Router
    private authController: AuthController

    constructor() {
        this.router = Router()
        this.authController = new AuthController()
        this.initRoutes()
    }

    private initRoutes() {
        this.router.post('/register', this.authController.register.bind(this.authController))
        this.router.post('/login', this.authController.login.bind(this.authController))
    }

    public getRouter(): Router {
        return this.router
    }
}