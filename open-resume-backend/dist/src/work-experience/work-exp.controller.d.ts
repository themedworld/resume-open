import { WorkExpService } from './work-exp.service';
import { CreateWorkExpDto } from './dto/create-work-exp.dto';
import { WorkExp } from './entities/work-exp.entity';
import { UpdateWorkExpDto } from './dto/update-work-exp.tdo';
export declare class WorkExpController {
    private readonly workExpService;
    constructor(workExpService: WorkExpService);
    createWorkExp(createWorkExpDtoArray: CreateWorkExpDto[]): Promise<WorkExp[]>;
    findWorkExpByResumeId(id: number): Promise<{
        workexp: WorkExp[];
        count: number;
    }>;
    updateWorkExp(id: number, updateWorkExpDto: UpdateWorkExpDto): Promise<WorkExp>;
    remove(id: string): Promise<void>;
    findjobTitle(jobTitle: string): Promise<{
        workExp: {
            id: number;
            resumeid: number;
            company: string;
            jobTitle: string;
            date: string;
            description: string;
        }[];
    }>;
}
