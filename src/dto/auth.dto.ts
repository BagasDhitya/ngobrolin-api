export interface RegisterDTO {
    email: string;
    password: string;
    avatar?: Express.Multer.File;
}

export interface LoginDTO {
    email: string;
    password: string;
}
