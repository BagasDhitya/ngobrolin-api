import { PrismaClient } from "@prisma/client";
import { CreatePostDTO, UpdatePostDTO } from "../dto/post.dto";
import { AppError } from "../helpers/response.helper";

const prisma = new PrismaClient();

export class PostService {
    public async create(profileId: string, data: CreatePostDTO) {
        console.log('prof id : ', profileId)
        return prisma.post.create({
            data: {
                title: data.title,
                content: data.content,
                profileId: profileId,
            },
        });
    }

    public async getAll() {
        return prisma.post.findMany({
            include: {
                profile: { select: { id: true, email: true, avatar: true } },
            },
        });
    }

    public async getById(postId: string) {
        return prisma.post.findUnique({
            where: { id: postId },
            include: { profile: { select: { id: true, email: true, avatar: true } } },
        });
    }

    public async update(postId: string, profileId: string, data: UpdatePostDTO) {
        const post = await prisma.post.findUnique({ where: { id: postId } });
        if (!post) throw new AppError("Post not found", 404);
        if (post.profileId !== profileId) throw new AppError("Unauthorized", 401);

        return prisma.post.update({
            where: { id: postId },
            data,
        });
    }

    public async delete(postId: string, profileId: string) {
        const post = await prisma.post.findUnique({ where: { id: postId } });
        if (!post) throw new AppError("Post not found", 404);
        if (post.profileId !== profileId) throw new AppError("Unauthorized", 401);

        return prisma.post.delete({
            where: { id: postId },
        });
    }
}
