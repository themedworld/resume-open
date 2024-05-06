import { Resume } from 'src/resume/entities/resume.entity';
export declare class Education {
    id: number;
    school: string;
    date: string;
    degree: string;
    gpa: string;
    descriptions: string[];
    resume: Resume;
}
