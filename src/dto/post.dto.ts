export interface CreatePostDTO {
    profileId?: string;
    title: string;
    content: string;
}

export interface UpdatePostDTO {
    profileId?: string;
    title?: string;
    content?: string;
}
