export interface ImagePostRequest {
    userId: string;
    description: string;
    tags: string[];
    url: string;
    id: string;
    encodingFormat: string;
    faces: Array<{
        age: number;
        gender: string;
    }>
}