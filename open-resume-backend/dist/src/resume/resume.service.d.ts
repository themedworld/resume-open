import { Repository } from 'typeorm';
import { CreateResumeDto } from './dto/create-resume.dto';
import { Resume } from './entities/resume.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { UpdateResumeNameDto } from './dto/update-resumename.dto';
export declare class ResumeService {
    private ResumeRepository;
    private UserRepository;
    constructor(ResumeRepository: Repository<Resume>, UserRepository: Repository<UserEntity>);
    createResume(createResumeDto: CreateResumeDto): Promise<Resume>;
    updateName(id: number, updateResumeNameDto: UpdateResumeNameDto): Promise<Resume>;
    findResumeByUserId(id: number): Promise<Resume[]>;
    findOne(id: number): Promise<Resume>;
    remove(id: number): Promise<void>;
    getAllResumesWithDetails(): Promise<Resume[]>;
}
