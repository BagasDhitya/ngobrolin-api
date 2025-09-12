import { Router } from "express";
import { PostController } from "../controllers/post.controller";

export class PostRouter {
    private router: Router;
    private postController: PostController;

    constructor() {
        this.router = Router();
        this.postController = new PostController();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get("/", this.postController.getAll.bind(this.postController));
        this.router.get("/:id", this.postController.getById.bind(this.postController));
        this.router.post("/", this.postController.create.bind(this.postController));
        this.router.put("/:id", this.postController.update.bind(this.postController));
        this.router.delete("/:id", this.postController.delete.bind(this.postController));
    }

    getRouter(): Router {
        return this.router;
    }
}
