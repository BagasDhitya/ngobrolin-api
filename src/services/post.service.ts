import { PrismaClient } from "@prisma/client";
import { CreatePostDTO, UpdatePostDTO } from "../dto/post.dto";
import { AppError } from "../helpers/response.helper";

import { CacheHelper } from "../helpers/cache.helper";

const prisma = new PrismaClient();
const cacheHelper = new CacheHelper()

export class PostService {
    public async create(profileId: string, data: CreatePostDTO) {

        const post = await prisma.post.create({
            data: {
                title: data.title,
                content: data.content,
                profileId: profileId,
            },
        });

        // invalidate cache ketika ada post baru
        await cacheHelper.deleteCache('posts:all')

        return post
    }

    public async getAll() {
        const cacheKey = 'posts:all'

        // cek di cache dulu
        const cached = await cacheHelper.getCache(cacheKey) as any;
        if (cached !== null && cached !== undefined) {
            return {
                source: 'cache',
                data: cached
            }
        }

        // kalau belum ada di cache, ambil dari DB
        const post = await prisma.post.findMany({
            include: {
                profile: { select: { id: true, email: true, avatar: true } },
            },
        });

        // simpan ke cache (60detik)
        await cacheHelper.setCache(cacheKey, post, 60)
        return {
            source: 'db',
            data: post
        }
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
