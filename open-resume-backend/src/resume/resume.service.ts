import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateResumeDto } from './dto/create-resume.dto';
import { Resume } from './entities/resume.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { UpdateResumeNameDto } from './dto/update-resumename.dto';
import { FindOneOptions } from 'typeorm'
import { Language } from 'src/language/entities/language.entity';
import { ResSet } from 'src/Resume-Setting/entities/res-set.entity';
import { Project } from 'src/project/entities/project.entity';
import { Education } from 'src/education/entities/education.entity';
import { CusSec } from 'src/Custumer-serction/entities/cus-sec.entity';
import { WorkExp } from 'src/work-experience/entities/work-exp.entity';
import { PerInf } from 'src/Personal-information/entities/per-inf.entity';
import { Skills } from 'src/skills/entities/skill.entity';
import { getConnection } from 'typeorm';
@Injectable()
export class ResumeService {
  constructor(
    @InjectRepository(Resume)
    private ResumeRepository: Repository<Resume>,
    @InjectRepository(UserEntity)
    private UserRepository: Repository<UserEntity>,
  ) {}

  async createResume(createResumeDto: CreateResumeDto): Promise<Resume> {
    const user = await this.UserRepository.findOne({ where: { id: createResumeDto.userid } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const Resume = this.ResumeRepository.create(createResumeDto);
    Resume.user = user;
    return this.ResumeRepository.save(Resume);
  }
  async updateName(id: number, updateResumeNameDto: UpdateResumeNameDto): Promise<Resume> {
    const resume = await this.ResumeRepository.findOne({ where: { id } });
    if (!resume) {
      throw new NotFoundException('Resume not found');
    }
    resume.name = updateResumeNameDto.name;
    return this.ResumeRepository.save(resume);
  }

  async findResumeByUserId(id: number): Promise<Resume[]> {
    return this.ResumeRepository.find({ where: { user: { id } } });
  }
  async findOne(id: number) {
    const options: FindOneOptions<Resume> = {
      where: { id },
      relations: [
        'user',
      ],
    };
    
    const resume = await this.ResumeRepository.findOne(options);
    if (!resume) throw new NotFoundException('Resume not found');
    
    return { ...resume, userId: resume.user.id };
  }
  

  async remove(id: number): Promise<void> {
    await this.ResumeRepository.delete(id);
  }
  async getAllResumesWithDetails(): Promise<Resume[]> {
    return this.ResumeRepository.find({
      relations: ['user', 'perInf', 'Education', 'projects', 'workExp', 'skills', 'resSet', 'CusSec', 'Language'],
    });
  }
}