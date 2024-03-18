import { CreateWorkExpDto } from './dto/create-work-exp.dto';
import { WorkExp } from './entities/work-exp.entity';
import { Repository } from 'typeorm';
import { Resume } from 'src/resume/entities/resume.entity';
import { UpdateWorkExpDto } from './dto/update-work-exp.tdo';
export declare class WorkExpService {
    private WorkExpRepository;
    private ResumeRepository;
    constructor(WorkExpRepository: Repository<WorkExp>, ResumeRepository: Repository<Resume>);
    createWorkExp(createWorkExpDto: CreateWorkExpDto): Promise<WorkExp>;
    updateWorkExp(id: number, updateWorkExpDto: UpdateWorkExpDto): Promise<WorkExp>;
    findResSetByResumeId(id: number): Promise<WorkExp[]>;
    remove(id: number): Promise<void>;
}
