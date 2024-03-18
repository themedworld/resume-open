
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEducationDto } from './dto/create-education.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Education } from './entities/education.entity';
import { Repository } from 'typeorm';
import { Resume } from 'src/resume/entities/resume.entity';
import { UpdateEducationDto } from './dto/update-education.dto';
@Injectable()
export class EducationService {

  constructor(
    @InjectRepository(Education)
    private EducationRepository: Repository<Education>,
    @InjectRepository(Resume)
    private ResumeRepository: Repository<Resume>,
  ) {}

  async createEducation(createEducationDto: CreateEducationDto): Promise<Education> {
    const resume = await this.ResumeRepository.findOne({ where: { id: createEducationDto.resumeid } });
    if (!resume) {
      throw new NotFoundException('Resume not found');
    }
    const Education = this.EducationRepository.create(createEducationDto);
    Education.resume = resume;
    return this.EducationRepository.save(Education);
  }

  async updateEducation(id: number, updateEducationDto: UpdateEducationDto): Promise<Education> {
    const education = await this.EducationRepository.findOne({ where: { id } });
    if (!education) {
      throw new NotFoundException(`Education with id ${id} not found`);
    }
    education.school = updateEducationDto.school;
    education.date = updateEducationDto.date;
    education.degree = updateEducationDto.degree;
    education.gpa = updateEducationDto.gpa;
    education.additionalInformation = updateEducationDto.additionalInformation;
    return this.EducationRepository.save(education);
  }

  async remove(id: number): Promise<void> {
    await this.EducationRepository.delete(id);
  }

  async findEducationByResumeId(id: number): Promise<Education[]> {
    return this.EducationRepository.find({ where: { resume: { id } } });
  }
}