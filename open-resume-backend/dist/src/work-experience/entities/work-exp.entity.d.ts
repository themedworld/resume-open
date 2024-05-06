import { Resume } from 'src/resume/entities/resume.entity';
export declare class WorkExp {
    id: number;
    company: string;
    jobTitle: string;
    date: string;
    descriptions: string[];
    resume: Resume;
}
