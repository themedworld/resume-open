import { ResumeService } from './resume.service';
import { CreateResumeDto } from './dto/create-resume.dto';
import { Resume } from './entities/resume.entity';
import { UpdateResumeNameDto } from './dto/update-resumename.dto';
export declare class ResumeController {
    private readonly resumeService;
    constructor(resumeService: ResumeService);
    createresume(createResumeDto: CreateResumeDto): Promise<{
        resume: Resume;
    }>;
    findResumeByUserId(id: number): Promise<{
        resumes: Resume[];
        count: number;
    }>;
    findOne(id: string): Promise<Resume>;
    updateName(id: number, updateResumeNameDto: UpdateResumeNameDto): Promise<Resume>;
    remove(id: string): Promise<void>;
}
