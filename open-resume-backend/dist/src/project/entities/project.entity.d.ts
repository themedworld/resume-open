import { Resume } from 'src/resume/entities/resume.entity';
export declare class Project {
    id: number;
    project: string;
    date: string;
    descriptions: string[];
    resume: Resume;
}
