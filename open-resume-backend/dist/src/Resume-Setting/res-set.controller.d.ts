import { ResSetService } from './res-set.service';
import { CreateResSetDto } from './dto/create-res-set.dto';
import { UpdateResSetDto } from './dto/update-res-set.dto';
import { ResSet } from './entities/res-set.entity';
export declare class ResSetController {
    private readonly resSetService;
    constructor(resSetService: ResSetService);
    craeteResSet(createResSetDto: CreateResSetDto): Promise<{
        resset: ResSet;
    }>;
    updateResSet(id: number, updateResSetDto: UpdateResSetDto): Promise<ResSet>;
    findResSetByResumeId(id: number): Promise<{
        ressets: ResSet[];
        count: number;
    }>;
    remove(id: string): Promise<void>;
}
