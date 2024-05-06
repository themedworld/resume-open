import { PhotoDto } from './dto/create-photo.dto';
import { Repository } from "typeorm";
import { Photo } from "./entities/photo.entity";
import { Resume } from 'src/resume/entities/resume.entity';
export declare class UploadedFileService {
    private readonly photoRepository;
    private resumeRepository;
    constructor(photoRepository: Repository<Photo>, resumeRepository: Repository<Resume>);
    createPhoto(createphotoDto: PhotoDto): Promise<Photo>;
    remove(id: number): Promise<void>;
    findPerInfByResumeId(id: any): Promise<Photo>;
}
