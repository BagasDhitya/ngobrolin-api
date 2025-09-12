export interface RegisterDTO {
    email: string;
    password: string;
    avatar?: string;
}

export interface LoginDTO {
    email: string;
    password: string;
}
