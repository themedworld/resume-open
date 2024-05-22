import { ResumeimageService } from './resumeimage.service';
import { CreateResumeimageDto } from './dto/create-resumeimage.dto';
import { Resumeimage } from "./entities/resumeimage.entity";
export declare class ResumeimageController {
    private readonly resumeimageService;
    constructor(resumeimageService: ResumeimageService);
    craeteResumeimage(createResumeimageDto: CreateResumeimageDto): Promise<{
        Resumeimage: Resumeimage;
    }>;
    remove(id: string): Promise<void>;
    findPerInfByResumeId(id: any): Promise<Resumeimage>;
}
