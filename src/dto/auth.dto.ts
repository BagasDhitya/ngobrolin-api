// DTO untuk registrasi & login

export interface RegisterDto {
    email: string;
    password: string;
    avatar?: string;
}

export interface LoginDto {
    email: string;
    password: string;
}
