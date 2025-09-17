export interface RegisterDTO {
    email: string;
    password: string;
    avatar?: Express.Multer.File;
    role?: 'USER' | 'SUPERADMIN'
}

export interface LoginDTO {
    email: string;
    password: string;
    otp: string;
}
