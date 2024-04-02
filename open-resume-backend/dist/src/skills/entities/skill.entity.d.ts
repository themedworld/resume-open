import { Resume } from 'src/resume/entities/resume.entity';
export declare class Skills {
    id: number;
    featuredSkills: {
        skill: string;
        rating: number;
    }[];
    descriptions: string[];
    resume: Resume;
}
