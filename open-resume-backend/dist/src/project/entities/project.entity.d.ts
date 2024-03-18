import { Resume } from 'src/resume/entities/resume.entity';
export declare class Project {
    id: number;
    projectName: string;
    date: Date;
    description: string;
    resume: Resume;
}
