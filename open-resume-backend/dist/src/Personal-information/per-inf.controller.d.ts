import { PerInfService } from './per-inf.service';
import { CreatePerInfDto } from './dto/create-per-inf.dto';
import { PerInf } from './entities/per-inf.entity';
import { UpdatePerInfDto } from './dto/update-per-inf.dto';
export declare class PerInfController {
    private readonly perInfService;
    constructor(perInfService: PerInfService);
    createPerInf(createPerInfDto: CreatePerInfDto): Promise<{
        perInf: PerInf;
    }>;
    updatePerInf(id: number, updatePerInfDto: UpdatePerInfDto): Promise<PerInf>;
    findPerInfByResumeId(id: number): Promise<PerInf>;
    remove(id: number): Promise<void>;
    findLocation(location: string): Promise<{
        perInf: {
            id: number;
            resumeid: number;
            name: string;
            summary: string;
            email: string;
            phone: string;
            location: string;
            url: string;
        }[];
    }>;
}
