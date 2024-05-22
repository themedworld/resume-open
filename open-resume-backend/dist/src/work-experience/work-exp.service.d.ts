import { CreateWorkExpDto } from './dto/create-work-exp.dto';
import { WorkExp } from './entities/work-exp.entity';
import { Repository } from 'typeorm';
import { Resume } from 'src/resume/entities/resume.entity';
import { UpdateWorkExpDto } from './dto/update-work-exp.tdo';
export declare class WorkExpService {
    private WorkExpRepository;
    private ResumeRepository;
    findJob: any;
    findJobTitle: any;
    findWorkExpByJobTitle(_jobTitle: string): void;
    find: any;
    constructor(WorkExpRepository: Repository<WorkExp>, ResumeRepository: Repository<Resume>);
    createWorkExp(createWorkExpDtoArray: CreateWorkExpDto[]): Promise<WorkExp[]>;
    updateWorkExp(id: number, updateWorkExpDto: UpdateWorkExpDto): Promise<WorkExp>;
    findWorkExpByResumeId(id: number): Promise<WorkExp[]>;
    remove(id: number): Promise<void>;
    findjobtitle(jobTitle: string): Promise<{
        id: number;
        resumeid: number;
        company: string;
        jobTitle: string;
        date: string;
        description: string;
    }[]>;
}
