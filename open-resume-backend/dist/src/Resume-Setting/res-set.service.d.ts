import { CreateResSetDto } from './dto/create-res-set.dto';
import { ResSet } from './entities/res-set.entity';
import { Repository } from 'typeorm';
import { UpdateResSetDto } from './dto/update-res-set.dto';
import { Resume } from 'src/resume/entities/resume.entity';
export declare class ResSetService {
    private ResSetRepository;
    private ResumeRepository;
    constructor(ResSetRepository: Repository<ResSet>, ResumeRepository: Repository<Resume>);
    createResSet(createResSetDto: CreateResSetDto): Promise<ResSet>;
    updateResSet(id: number, updateResSetDto: UpdateResSetDto): Promise<ResSet>;
    findResSetByResumeId(id: number): Promise<ResSet[]>;
    remove(id: number): Promise<void>;
}
