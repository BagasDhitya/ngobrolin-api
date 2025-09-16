import { ZodObject } from 'zod'
import { Request, Response, NextFunction } from 'express'
import { AppError } from '../helpers/response.helper'

export function validate(schema: ZodObject) {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse({
                body: req.body,
                query: req.query,
                params: req.params
            })
            next()
        } catch (error: any) {
            throw new AppError((error as Error).message, 400)
        }
    }
}