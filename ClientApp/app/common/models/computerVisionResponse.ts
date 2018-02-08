export interface ComputerVisionRequest {
    url: string;
}
export interface ComputerVisionResponse {
    description: {
        captions: Array<{
            confidence: number;
            text: string;
        }>;
    }
    tags: Array<{
        confidence: number;
        name: string;
    }>
    faces: Array<{
        age: number;
        gender: string;
        faceRectangle: { 
            left: number;
            top: number;
            width: number;
            height: number;
        }
    }>
}