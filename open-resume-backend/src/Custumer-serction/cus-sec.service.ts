import { CusSecModule } from './cus-sec.module';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCusSecDto } from './dto/create-cus-sec.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CusSec } from './entities/cus-sec.entity';
import { Repository } from 'typeorm';
import { Resume } from 'src/resume/entities/resume.entity';
import { UpdateCusSecDto } from './dto/update-cussec.dto';
@Injectable()
export class CusSecService {

  constructor(
    @InjectRepository(CusSec)
    private CusSecRepository: Repository<CusSec>,
    @InjectRepository(Resume)
    private ResumeRepository: Repository<Resume>,
  ) {}

  async createCusSec(createCusSecDto: CreateCusSecDto): Promise<CusSec> {
    const resume = await this.ResumeRepository.findOne({ where: { id: createCusSecDto.resumeid } });
    if (!resume) {
      throw new NotFoundException('Resume not found');
    }
    const CusSec = this.CusSecRepository.create(createCusSecDto);
    CusSec.resume = resume;
    return this.CusSecRepository.save(CusSec);
  }
  async updateCusSec(id: number, updateCusSecDto: UpdateCusSecDto): Promise<CusSec> {
    const cusSec = await this.CusSecRepository.findOne({ where: { id } });
    if (!cusSec) {
      throw new NotFoundException(`CusSec with id ${id} not found`);
    }
    cusSec.descriptions = updateCusSecDto.descriptions;
    return this.CusSecRepository.save(cusSec);
  }

  async remove(id: number): Promise<void> {
    await this.CusSecRepository.delete(id);
  }
  async findCusSecByResumeId(id: number): Promise<CusSec[]> {
    return this.CusSecRepository.find({ where: { resume: { id } } });
  }
}