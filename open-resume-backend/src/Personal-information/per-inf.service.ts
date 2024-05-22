/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PerInf } from './entities/per-inf.entity';
import { Resume } from 'src/resume/entities/resume.entity';
import { CreatePerInfDto } from './dto/create-per-inf.dto';
import { UpdatePerInfDto } from './dto/update-per-inf.dto';

@Injectable()
export class PerInfService {
  constructor(
    @InjectRepository(PerInf)
    private readonly perInfRepository: Repository<PerInf>,
    @InjectRepository(Resume)
    private readonly resumeRepository: Repository<Resume>,
  ) {}

  async createPerInf(createPerInfDto: CreatePerInfDto): Promise<PerInf> {
    const resume = await this.resumeRepository.findOne({ where: { id: createPerInfDto.resumeid } });
    if (!resume) {
      throw new NotFoundException('Resume not found');
    }
    const perInf = this.perInfRepository.create(createPerInfDto);
    perInf.resume = resume;
    return this.perInfRepository.save(perInf);
  }

  async updatePerInf(id: number, updatePerInfDto: UpdatePerInfDto): Promise<PerInf> {
    const perInf = await this.perInfRepository.findOne({ where: { id } });
    if (!perInf) {
      throw new NotFoundException(`PerInf with id ${id} not found`);
    }
    Object.assign(perInf, updatePerInfDto);
    return this.perInfRepository.save(perInf);
  }

  async remove(id: number): Promise<void> {
    await this.perInfRepository.delete(id);
  }

  async findPerInfByResumeId(id: number): Promise<PerInf> {
    return this.perInfRepository.findOne({ where: { resume: { id } } });
  }

  async findLocation(location: string): Promise<{ id: number, resumeid: number, name: string, summary: string, email: string, phone: string, location: string, url: string }[]> {
    const perInf = await this.perInfRepository
      .createQueryBuilder('perInf')
      .select([
        'perInf.id',
        'resume.id AS resumeid',
        'perInf.name',
        'perInf.summary',
        'perInf.email',
        'perInf.phone',
        'perInf.location',
        'perInf.url',
      ])
      .leftJoin('perInf.resume', 'resume')
      .where('perInf.location ILIKE :location', { location: `%${location}%` })
      .getRawMany();

    return perInf.map((item) => ({
      id: item.id,
      resumeid: item.resumeid,
      name: item.name,
      summary: item.summary,
      email: item.email,
      phone: item.phone,
      location: item.location,
      url: item.url,
    }));
  }
}
