import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateResSetDto } from './dto/create-res-set.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ResSet } from './entities/res-set.entity';
import { Repository } from 'typeorm';
import { UpdateResSetDto } from './dto/update-res-set.dto';
import { Resume } from 'src/resume/entities/resume.entity';
@Injectable()
export class ResSetService {

  constructor(
    @InjectRepository(ResSet)
    private ResSetRepository: Repository<ResSet>,
    @InjectRepository(Resume)
    private ResumeRepository: Repository<Resume>,
  ) {}

  async createResSet(createResSetDto: CreateResSetDto): Promise<ResSet> {
    const resume = await this.ResumeRepository.findOne({ where: { id: createResSetDto.resumeid } });
    if (!resume) {
      throw new NotFoundException('Resume not found');
    }
    const ResSet = this.ResSetRepository.create(createResSetDto);
    ResSet.resume = resume;
    return this.ResSetRepository.save(ResSet);
  }
  async updateResSet(id: number, updateResSetDto: UpdateResSetDto): Promise<ResSet> {
    const resset = await this.ResSetRepository.findOne({ where: { id } });
    if (!resset) {
      throw new NotFoundException(`Project with id ${id} not found`);
    } 
    resset.themeColor = updateResSetDto.themeColor;
    resset.fontSize = updateResSetDto.fontSize;
    resset.fontFamily = updateResSetDto.fontFamily;
    resset.documentSize = updateResSetDto.documentSize;
    return this.ResSetRepository.save(resset);
  }
  async findResSetByResumeId(id: number): Promise<ResSet[]> {
    return this.ResSetRepository.find({ where: { resume: { id } } });
  }
  async remove(id: number): Promise<void> {
    await this.ResSetRepository.delete({ resume: { id } });
  }
}