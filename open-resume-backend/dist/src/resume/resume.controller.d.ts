import { ResumeService } from './resume.service';
import { CreateResumeDto } from './dto/create-resume.dto';
import { Resume } from './entities/resume.entity';
import { UpdateResumeNameDto } from './dto/update-resumename.dto';
import { UsersService } from 'src/users/users.service';
import { CusSecService } from 'src/Custumer-serction/cus-sec.service';
import { EducationService } from 'src/education/education.service';
import { LanguageService } from 'src/language/language.service';
import { PerInfService } from 'src/Personal-information/per-inf.service';
import { ProjectService } from 'src/project/project.service';
import { ResSetService } from 'src/Resume-Setting/res-set.service';
import { SkillsService } from 'src/skills/skills.service';
import { WorkExpService } from 'src/work-experience/work-exp.service';
export declare class ResumeController {
    private readonly resumeService;
    private readonly usersService;
    private readonly educationService;
    private readonly languageService;
    private readonly perInfService;
    private readonly projectService;
    private readonly resSetService;
    private readonly skillsService;
    private readonly workExpService;
    private readonly cusSecService;
    constructor(resumeService: ResumeService, usersService: UsersService, educationService: EducationService, languageService: LanguageService, perInfService: PerInfService, projectService: ProjectService, resSetService: ResSetService, skillsService: SkillsService, workExpService: WorkExpService, cusSecService: CusSecService);
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
    getAllResumes(): Promise<any>;
}
