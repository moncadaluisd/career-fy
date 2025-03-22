
export interface Curriculum {
    _id?: string;
    name: string;
    notes: string;
    path: string;
    status: string;
    fileIdAi: string;
    data: string;
    description?: string;
    curriculumReview: CurriculumReview[];
    createdAt: Date;
    updatedAt: Date;
    usedIn?: number;
}

export interface CurriculumReview {
    _id: string;
    review: string;
    score: number;
    feedback: string;
    suggestions: string;
}