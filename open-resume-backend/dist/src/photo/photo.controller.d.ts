import { UploadedFileService } from "./photo.service";
import { PhotoDto } from "./dto/create-photo.dto";
import { Photo } from './entities/photo.entity';
export declare class UploadedFileController {
    private readonly uploadedFileService;
    constructor(uploadedFileService: UploadedFileService);
    createPhoto(photoDto: PhotoDto): Promise<{
        photo: Photo;
    }>;
}
