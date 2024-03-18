import { CreateCusSecDto } from './dto/create-cus-sec.dto';
import { CusSec } from './entities/cus-sec.entity';
import { Repository } from 'typeorm';
import { Resume } from 'src/resume/entities/resume.entity';
import { UpdateCusSecDto } from './dto/update-cussec.dto';
export declare class CusSecService {
    private CusSecRepository;
    private ResumeRepository;
    constructor(CusSecRepository: Repository<CusSec>, ResumeRepository: Repository<Resume>);
    createCusSec(createCusSecDto: CreateCusSecDto): Promise<CusSec>;
    updateCusSec(id: number, updateCusSecDto: UpdateCusSecDto): Promise<CusSec>;
    remove(id: number): Promise<void>;
    findCusSecByResumeId(id: number): Promise<CusSec[]>;
}
