import { PerInf } from 'src/Personal-information/entities/per-inf.entity';
import { Resume } from 'src/resume/entities/resume.entity';
import { CreatePerInfDto } from './dto/create-per-inf.dto';
import { Repository } from 'typeorm';
import { UpdatePerInfDto } from './dto/update-per-inf.dto';
export declare class PerInfService {
    private PerInfRepository;
    private ResumeRepository;
    constructor(PerInfRepository: Repository<PerInf>, ResumeRepository: Repository<Resume>);
    createPerInf(createPerInfDto: CreatePerInfDto): Promise<PerInf>;
    updatePerInf(id: number, updatePerInfDto: UpdatePerInfDto): Promise<PerInf>;
    remove(id: number): Promise<void>;
    findPerInfByResumeId(id: any): Promise<PerInf>;
}
