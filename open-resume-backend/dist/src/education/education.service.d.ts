import { CreateEducationDto } from './dto/create-education.dto';
import { Education } from './entities/education.entity';
import { Repository } from 'typeorm';
import { Resume } from 'src/resume/entities/resume.entity';
import { UpdateEducationDto } from './dto/update-education.dto';
export declare class EducationService {
    private EducationRepository;
    private ResumeRepository;
    constructor(EducationRepository: Repository<Education>, ResumeRepository: Repository<Resume>);
    createEducation(createEducationDtoArray: CreateEducationDto[]): Promise<Education[]>;
    updateEducation(id: number, updateEducationDto: UpdateEducationDto): Promise<Education>;
    remove(id: number): Promise<void>;
    findEducationByResumeId(id: number): Promise<Education[]>;
}
