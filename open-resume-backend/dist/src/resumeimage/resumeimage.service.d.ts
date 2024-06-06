import { CreateResumeimageDto } from './dto/create-resumeimage.dto';
import { Resume } from 'src/resume/entities/resume.entity';
import { Resumeimage } from './entities/resumeimage.entity';
import { Repository } from 'typeorm';
export declare class ResumeimageService {
    private readonly ResumeimageRepository;
    private resumeRepository;
    constructor(ResumeimageRepository: Repository<Resumeimage>, resumeRepository: Repository<Resume>);
    createResumeimage(createResumeimageDto: CreateResumeimageDto): Promise<Resumeimage>;
    updateimage(id: number, createResumeimageDto: CreateResumeimageDto): Promise<Resumeimage>;
    findAll(): string;
    findOne(id: number): string;
    remove(id: number): Promise<void>;
    findPhotoByResumeId(id: any): Promise<Resumeimage>;
}
