import { z as zod } from 'zod'

export const registerSchema = zod.object({
    body: zod.object({
        email: zod.email('Email is not valid'),
        password: zod.string().min(6, 'Password must be at least 6 chars'),
        avatar: zod.any().optional()
    })
})

export const loginSchema = zod.object({
    body: zod.object({
        email: zod.email('Email is not valid'),
        password: zod.string().min(6, 'Password must be at least 6 chars'),
    })
})