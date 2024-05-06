import { Injectable, NotFoundException } from '@nestjs/common';
import { PhotoDto } from './dto/create-photo.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Photo } from "./entities/photo.entity";
import { Resume } from 'src/resume/entities/resume.entity';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class UploadedFileService {
  constructor(
    @InjectRepository(Photo)
    private readonly photoRepository: Repository<Photo>,
    @InjectRepository(Resume)
    private resumeRepository: Repository<Resume>,
  ) {}

  async createPhoto(createphotoDto: PhotoDto): Promise<Photo> {
    const resume = await this.resumeRepository.findOne({ where: { id: createphotoDto.resumeid } });
    if (!resume) {
      throw new NotFoundException('Resume not found');
    }
    const Photo = this.photoRepository.create(createphotoDto);
    Photo.resume = resume;
    return this.photoRepository.save(Photo);
  }
  async remove(id: number): Promise<void> {
    await this.photoRepository.delete({ resume: { id } });
  }

  async findPerInfByResumeId(id) {
    return this.photoRepository.findOne({ where: { resume: { id } } });
  }
}
