// DTO untuk Post

export interface CreatePostDto {
    title: string;
    content: string;
}

export interface UpdatePostDto {
    title?: string;
    content?: string;
}
