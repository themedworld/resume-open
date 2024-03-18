import { Resume } from 'src/resume/entities/resume.entity';
export declare class Education {
    id: number;
    school: string;
    date: Date;
    degree: string;
    gpa: string;
    additionalInformation: string;
    resume: Resume;
}
