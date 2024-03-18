import { Resume } from 'src/resume/entities/resume.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePerInfDto } from './dto/create-per-inf.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PerInf } from './entities/per-inf.entity';
import { Repository } from 'typeorm';
import { UpdatePerInfDto } from './dto/update-per-inf.dto';
@Injectable()
export class PerInfService {

  constructor(
    @InjectRepository(PerInf)
    private PerInfRepository: Repository<PerInf>,
    @InjectRepository(Resume)
    private ResumeRepository: Repository<Resume>,
  ) {}

  async createPerInf(createPerInfDto: CreatePerInfDto): Promise<PerInf> {
    const resume = await this.ResumeRepository.findOne({ where: { id: createPerInfDto.resumeid } });
    if (!resume) {
      throw new NotFoundException('Resume not found');
    }
    const PerInf = this.PerInfRepository.create(createPerInfDto);
    PerInf.resume = resume;
    return this.PerInfRepository.save(PerInf);
  }

  async updatePerInf(id: number, updatePerInfDto: UpdatePerInfDto): Promise<PerInf> {
    const perInf = await this.PerInfRepository.findOne({ where: { id } });
    if (!perInf) {
      throw new NotFoundException(`PerInf with id ${id} not found`);
    }
    perInf.name = updatePerInfDto.name;
    perInf.objective = updatePerInfDto.objective;
    perInf.email = updatePerInfDto.email;
    perInf.phone = updatePerInfDto.phone;
    perInf.location = updatePerInfDto.location;
    perInf.website = updatePerInfDto.website;
    return this.PerInfRepository.save(perInf);
  }


  async remove(id: number): Promise<void> {
    await this.PerInfRepository.delete(id);
  }
  async findPerInfByResumeId(id) {
    return this.PerInfRepository.findOne({ where: { resume: { id } } });
  }
}