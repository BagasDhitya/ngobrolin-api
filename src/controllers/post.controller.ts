import { Request, Response, NextFunction } from "express";
import { PostService } from "../services/post.service";
import { CreatePostDTO, UpdatePostDTO } from "../dto/post.dto";
import { successResponse, AppError } from "../helpers/response.helper";

export class PostController {
    private postService: PostService;

    constructor() {
        this.postService = new PostService();
    }

    public async create(req: Request, res: Response, next: NextFunction) {
        const body: CreatePostDTO = req.body;
        console.log('body : ', body)
        console.log('req user id : ', req.user)

        if (!body.title || !body.content) {
            throw new AppError("Title and content are required", 400);
        }

        const post = await this.postService.create(req.user.id, body);
        return successResponse(res, post, "Post created", 201);
    }

    public async getAll(req: Request, res: Response, next: NextFunction) {
        const posts = await this.postService.getAll();
        return successResponse(res, posts, "All posts retrieved");
    }

    public async getById(req: Request, res: Response, next: NextFunction) {
        const post = await this.postService.getById(req.params.id);

        if (!post) {
            throw new AppError("Post not found", 404);
        }

        return successResponse(res, post, "Post retrieved");
    }

    public async update(req: Request, res: Response, next: NextFunction) {
        const body: UpdatePostDTO = req.body;

        if (!body.title && !body.content) {
            throw new AppError("At least one field (title or content) must be provided", 400);
        }

        const post = await this.postService.update(
            req.params.id,
            (req as any).user.id,
            body
        );

        if (!post) {
            throw new AppError("Post not found or not authorized", 404);
        }

        return successResponse(res, post, "Post updated");
    }

    public async delete(req: Request, res: Response, next: NextFunction) {
        const post = await this.postService.getById(req.params.id);

        if (!post) {
            throw new AppError("Post not found", 404);
        }

        await this.postService.delete(req.params.id, (req as any).user.id);
        return successResponse(res, null, "Post deleted");
    }
}
