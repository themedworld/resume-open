import { Injectable } from '@nestjs/common';
import { CreateResumeimageDto } from './dto/create-resumeimage.dto';
import { Resume } from 'src/resume/entities/resume.entity';
import { Resumeimage } from './entities/resumeimage.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
@Injectable()
export class ResumeimageService {

  constructor(
    @InjectRepository(Resumeimage)
    private readonly ResumeimageRepository: Repository<Resumeimage>,
    @InjectRepository(Resume)
    private resumeRepository: Repository<Resume>,
  ) {}


  async createResumeimage(createResumeimageDto:CreateResumeimageDto ): Promise<Resumeimage> {
    const resume = await this.resumeRepository.findOne({ where: { id: createResumeimageDto.resumeid } });
    if (!resume) {
      throw new NotFoundException('Resume not found');
    }
    const Resumeimage = this.ResumeimageRepository.create(createResumeimageDto);
    Resumeimage.resume = resume;
    return this.ResumeimageRepository.save(Resumeimage);
  }


  findAll() {
    return `This action returns all resumeimage`;
  }

  findOne(id: number) {
    return `This action returns a #${id} resumeimage`;
  }
  async remove(id: number): Promise<void> {
    await this.ResumeimageRepository.delete({ resume: { id } });
  }

  async findPhotoByResumeId(id) {
    return this.ResumeimageRepository.findOne({ where: { resume: { id } } });
  }
}
