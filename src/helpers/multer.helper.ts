import multer, { FileFilterCallback } from 'multer'
import { AppError } from './response.helper'
import path from 'path'

// penampung sementara sebelum masuk ke cloudinary
const storage = multer.memoryStorage()

// file filter : hanya image
function fileFilter(req: any, file: Express.Multer.File, cb: FileFilterCallback) {

    // jenis extension yang diizinkan
    const allowedTypes = /jpeg|jpg|png|gif/
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = allowedTypes.test(file.mimetype)

    if (mimetype && extname) {
        cb(null, true)
    } else {
        cb(new AppError('Only images are allowed', 400))
    }
}

// max file size : 5 MB
const limits = {
    fileSize: 5 * 1024 * 1024
}

export const uploadAvatar = multer({ storage, fileFilter, limits })