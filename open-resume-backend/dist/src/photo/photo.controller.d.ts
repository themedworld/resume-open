import { UploadedFileService } from "./photo.service";
import { PhotoDto } from "./dto/create-photo.dto";
import { Photo } from './entities/photo.entity';
export declare class UploadedFileController {
    private readonly uploadedFileService;
    constructor(uploadedFileService: UploadedFileService);
    craetePerInf(createPhotofDto: PhotoDto): Promise<{
        Photo: Photo;
    }>;
    remove(id: string): Promise<void>;
    findPerInfByResumeId(id: any): Promise<Photo>;
}
