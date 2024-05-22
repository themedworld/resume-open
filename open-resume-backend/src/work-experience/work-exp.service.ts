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


  async createWorkExp(createWorkExpDtoArray: CreateWorkExpDto[]): Promise<WorkExp[]> {
    const WorkExpPromises = createWorkExpDtoArray.map(async (createWorkExpDto) => {
      const { resumeid, ...rest } = createWorkExpDto;
      const resume = await this.ResumeRepository.findOne({ where: { id: resumeid } });
      if (!resume) {
        throw new NotFoundException('Resume not found');
      }
      const WorkExp = this.WorkExpRepository.create(rest);
      WorkExp.resume = resume;
      return this.WorkExpRepository.save(WorkExp);
    });
  
    return await Promise.all(WorkExpPromises);
  }

  async updateWorkExp(id: number, updateWorkExpDto: UpdateWorkExpDto): Promise<WorkExp> {
    const workExp = await this.WorkExpRepository.findOne({ where: { id } });
    if (!workExp) {
      throw new NotFoundException(`WorkExp with id ${id} not found`);
    }
    workExp.company = updateWorkExpDto.company;
    workExp.jobTitle = updateWorkExpDto.jobTitle;
    workExp.date = updateWorkExpDto.date;
    workExp.descriptions = updateWorkExpDto.descriptions;
    return this.WorkExpRepository.save(workExp);
  }
  async findWorkExpByResumeId(id: number): Promise<WorkExp[]> {
    return this.WorkExpRepository.find({ where: { resume: { id } } });
  }
  async remove(id: number): Promise<void> {
    await this.WorkExpRepository.delete({ resume: { id } });
  }

  async findjobtitle(jobTitle: string): Promise<{ id: number, resumeid: number, company: string, jobTitle: string, date: string, description: string }[]> {
    const workExp = await this.WorkExpRepository
      .createQueryBuilder('workExp')
      .select(['workExp.id', 'resume.id as resumeid', 'workExp.company', 'workExp.jobTitle', 'workExp.date', 'workExp.descriptions']) // Utilisation de "workExp" au lieu de "jobTitle"
      .leftJoin('workExp.resume', 'resume')
      .where('workExp.jobTitle ILIKE :jobTitle', { jobTitle: `%${jobTitle}%` })
      .getRawMany();
  
    return workExp.map(workExp => ({
      id: workExp.id,
      resumeid: workExp.resumeid,
      company: workExp.company,
      jobTitle: workExp.jobTitle,
      date: workExp.date,
      description: workExp.descriptions.join(', '), // Utilisation de "descriptions" au lieu de "description"
    }));
  }
  

}