import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWorkExpDto } from './dto/create-work-exp.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { WorkExp } from './entities/work-exp.entity';
import { Repository } from 'typeorm';
import { Resume } from 'src/resume/entities/resume.entity';
import { UpdateWorkExpDto } from './dto/update-work-exp.tdo';
@Injectable()
export class WorkExpService {

  constructor(
    @InjectRepository(WorkExp)
    private WorkExpRepository: Repository<WorkExp>,
    @InjectRepository(Resume)
    private ResumeRepository: Repository<Resume>,
  ) {}


  async createWorkExp(createWorkExpDto: CreateWorkExpDto): Promise<WorkExp> {
    const resume = await this.ResumeRepository.findOne({ where: { id: createWorkExpDto.resumeid } });
    if (!resume) {
      throw new NotFoundException('Resume not found');
    }
    const WorkExp = this.WorkExpRepository.create(createWorkExpDto);
    WorkExp.resume = resume;
    return this.WorkExpRepository.save(WorkExp);
  }

  async updateWorkExp(id: number, updateWorkExpDto: UpdateWorkExpDto): Promise<WorkExp> {
    const workExp = await this.WorkExpRepository.findOne({ where: { id } });
    if (!workExp) {
      throw new NotFoundException(`WorkExp with id ${id} not found`);
    }
    workExp.companyName = updateWorkExpDto.companyName;
    workExp.jobTitle = updateWorkExpDto.jobTitle;
    workExp.date = updateWorkExpDto.date;
    workExp.description = updateWorkExpDto.description;
    return this.WorkExpRepository.save(workExp);
  }
  async findResSetByResumeId(id: number): Promise<WorkExp[]> {
    return this.WorkExpRepository.find({ where: { resume: { id } } });
  }
  async remove(id: number): Promise<void> {
    await this.WorkExpRepository.delete(id);
  }
}