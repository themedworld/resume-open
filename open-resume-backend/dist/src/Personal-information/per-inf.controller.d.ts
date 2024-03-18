import { PerInfService } from './per-inf.service';
import { CreatePerInfDto } from './dto/create-per-inf.dto';
import { PerInf } from './entities/per-inf.entity';
import { UpdatePerInfDto } from './dto/update-per-inf.dto';
export declare class PerInfController {
    private readonly perInfService;
    constructor(perInfService: PerInfService);
    craetePerInf(createPerInfDto: CreatePerInfDto): Promise<{
        perinf: PerInf;
    }>;
    updatePerInf(id: number, updatePerInfDto: UpdatePerInfDto): Promise<PerInf>;
    findPerInfByResumeId(id: any): Promise<PerInf>;
    remove(id: string): Promise<void>;
}
