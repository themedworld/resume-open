/// <reference types="node" />
import { PhotoDto } from './dto/create-photo.dto';
import { Repository } from "typeorm";
import { Photo } from "./entities/photo.entity";
import { Resume } from 'src/resume/entities/resume.entity';
export declare class UploadedFileService {
    private readonly photoRepository;
    private resumeRepository;
    constructor(photoRepository: Repository<Photo>, resumeRepository: Repository<Resume>);
    createPhoto(photoDto: PhotoDto, fileBuffer: Buffer): Promise<Photo>;
    private saveFile;
    readFile(filePath: string): Promise<Buffer>;
}
