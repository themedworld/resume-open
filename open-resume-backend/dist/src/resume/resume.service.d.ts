import { Repository } from 'typeorm';
import { CreateResumeDto } from './dto/create-resume.dto';
import { Resume } from './entities/resume.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { UpdateResumeNameDto } from './dto/update-resumename.dto';
import { Language } from 'src/language/entities/language.entity';
import { ResSet } from 'src/Resume-Setting/entities/res-set.entity';
import { Project } from 'src/project/entities/project.entity';
import { Education } from 'src/education/entities/education.entity';
import { CusSec } from 'src/Custumer-serction/entities/cus-sec.entity';
import { WorkExp } from 'src/work-experience/entities/work-exp.entity';
import { PerInf } from 'src/Personal-information/entities/per-inf.entity';
import { Skills } from 'src/skills/entities/skill.entity';
export declare class ResumeService {
    private ResumeRepository;
    private UserRepository;
    constructor(ResumeRepository: Repository<Resume>, UserRepository: Repository<UserEntity>);
    createResume(createResumeDto: CreateResumeDto): Promise<Resume>;
    updateName(id: number, updateResumeNameDto: UpdateResumeNameDto): Promise<Resume>;
    findResumeByUserId(id: number): Promise<Resume[]>;
    findOne(id: number): Promise<{
        userId: number;
        id: number;
        user: UserEntity;
        name: string;
        perInf: PerInf;
        Education: Education[];
        projects: Project[];
        workExp: WorkExp[];
        skills: Skills[];
        resSet: ResSet;
        CusSec: CusSec;
        Photo: import("../photo/entities/photo.entity").Photo;
        Resumeimage: import("../resumeimage/entities/resumeimage.entity").Resumeimage;
        Language: Language[];
    }>;
    remove(id: number): Promise<void>;
    getAllResumesWithDetails(): Promise<Resume[]>;
}
