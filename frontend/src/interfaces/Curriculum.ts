
export interface Curriculum {
    _id: string;
    name: string;
    path: string;
    status: string;
    fileIdAi: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface CurriculumReview {
    _id: string;
    review: string;
    score: number;
    feedback: string;
    suggestions: string;
}