import { CusSecService } from './cus-sec.service';
import { CreateCusSecDto } from './dto/create-cus-sec.dto';
import { CusSec } from './entities/cus-sec.entity';
import { UpdateCusSecDto } from './dto/update-cussec.dto';
export declare class CusSecController {
    private readonly cusSecService;
    constructor(cusSecService: CusSecService);
    createCusSec(createCusSecDto: CreateCusSecDto): Promise<{
        cussec: CusSec;
    }>;
    updateCusSec(id: number, updateCusSecDto: UpdateCusSecDto): Promise<CusSec>;
    remove(id: string): Promise<void>;
    findCusSecByResumeId(id: number): Promise<{
        cusSecs: CusSec[];
        count: number;
    }>;
}
