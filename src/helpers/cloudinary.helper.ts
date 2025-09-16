import { v2 as cloudinary } from "cloudinary";
import fs from 'fs'
import dotenv from 'dotenv'
import { AppError } from "./response.helper";

dotenv.config()

// setup cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

export class CloudinaryHelper {
    public async uploadImageFromBuffer(buffer: Buffer, folder: string = 'users') {
        try {
            const uploadPromise = new Promise<string>((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    { folder, resource_type: 'image' },
                    (error, result) => {
                        if (error || !result) {
                            reject(new AppError('Failed to upload image', 500));
                        } else {
                            resolve(result.secure_url);
                        }
                    }
                );
                uploadStream.end(buffer);
            });

            // jika sukses upload ke cloudinary, kembalikan hasil urlnya
            return await uploadPromise;
        } catch (error) {

        }
    }
}