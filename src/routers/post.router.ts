import { Router } from "express";
import { PostController } from "../controllers/post.controller";
import { authenticate } from "../middlewares/auth.middleware";

export class PostRouter {
    private router: Router;
    private postController: PostController;

    constructor() {
        this.router = Router();
        this.postController = new PostController();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.get("/", this.postController.getAll.bind(this.postController));
        this.router.get("/:id", this.postController.getById.bind(this.postController));
        this.router.post("/", authenticate, this.postController.create.bind(this.postController));
        this.router.put("/:id", authenticate, this.postController.update.bind(this.postController));
        this.router.delete("/:id", authenticate, this.postController.delete.bind(this.postController));
    }

    getRouter(): Router {
        return this.router;
    }
}
