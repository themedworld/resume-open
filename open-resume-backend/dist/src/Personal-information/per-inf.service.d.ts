import { Repository } from 'typeorm';
import { PerInf } from './entities/per-inf.entity';
import { Resume } from 'src/resume/entities/resume.entity';
import { CreatePerInfDto } from './dto/create-per-inf.dto';
import { UpdatePerInfDto } from './dto/update-per-inf.dto';
export declare class PerInfService {
    private readonly perInfRepository;
    private readonly resumeRepository;
    constructor(perInfRepository: Repository<PerInf>, resumeRepository: Repository<Resume>);
    createPerInf(createPerInfDto: CreatePerInfDto): Promise<PerInf>;
    updatePerInf(id: number, updatePerInfDto: UpdatePerInfDto): Promise<PerInf>;
    remove(id: number): Promise<void>;
    findPerInfByResumeId(id: number): Promise<PerInf>;
    findLocation(location: string): Promise<{
        id: number;
        resumeid: number;
        name: string;
        summary: string;
        email: string;
        phone: string;
        location: string;
        url: string;
    }[]>;
}
