import express, { Application, Request, Response } from 'express'
import { errorResponse } from './helpers/response.helper'
import { PostRouter } from './routers/post.router'
import { ReportRouter } from './routers/report.router'
import { AuthRouter } from './routers/auth.router'

class App {
    private app: Application
    private port: number

    constructor(port: number) {
        this.app = express()
        this.port = port

        this.initMiddlewares()
        this.initRoutes()
        this.initErrorHandlers()
    }

    private initErrorHandlers(): void {
        this.app.use((req: Request, res: Response) => {
            errorResponse(res, req)
        })
    }

    private initMiddlewares(): void {
        this.app.use(express.json())
    }

    private initRoutes(): void {
        // define routes here
        this.app.use('/api/posts', new PostRouter().getRouter())
        this.app.use('/api/reports', new ReportRouter().getRouter())
        this.app.use('/api/auth', new AuthRouter().getRouter())
    }

    public listen(): void {
        this.app.listen(this.port, () => {
            console.log(`Server running at http://localhost:${this.port}`)
        })
    }
}

const server = new App(8000)
server.listen()