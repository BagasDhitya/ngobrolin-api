// DTO untuk Profile

export interface CreateProfileDto {
    name: string;
    bio?: string;
}

export interface UpdateProfileDto {
    name?: string;
    bio?: string;
}
