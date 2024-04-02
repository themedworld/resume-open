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
  async createEducation(createEducationDtoArray: CreateEducationDto[]): Promise<Education[]> {
    const educationPromises = createEducationDtoArray.map(async (createEducationDto) => {
      const { resumeid, ...rest } = createEducationDto;
      const resume = await this.ResumeRepository.findOne({ where: { id: resumeid } });
      if (!resume) {
        throw new NotFoundException('Resume not found');
      }
      const education = this.EducationRepository.create(rest);
      education.resume = resume;
      return this.EducationRepository.save(education);
    });
  
    return await Promise.all(educationPromises);
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
    education.descriptions = updateEducationDto.descriptions;
    return this.EducationRepository.save(education);
  }

  async remove(id: number): Promise<void> {
    await this.EducationRepository.delete(id);
  }

  async findEducationByResumeId(id: number): Promise<Education[]> {
    return this.EducationRepository.find({ where: { resume: { id } } });
  }


}