import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLanguageDto } from './dto/create-language.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Language } from './entities/language.entity';
import { Resume } from 'src/resume/entities/resume.entity';
import { UpdateLanguageDto } from './dto/update-language.dto';
@Injectable()
export class LanguageService {

  constructor(
    @InjectRepository(Language)
    private LanguageRepository: Repository<Language>,
    @InjectRepository(Resume)
    private ResumeRepository: Repository<Resume>,
  ) {}


  async createLanguage(createLanguageDto: CreateLanguageDto): Promise<Language> {
    const resume = await this.ResumeRepository.findOne({ where: { id: createLanguageDto.resumeid } });
    if (!resume) {
      throw new NotFoundException('Resume not found');
    }
    const Language = this.LanguageRepository.create(createLanguageDto);
    Language.resume = resume;
    return this.LanguageRepository.save(Language);
  }
  async updateLanguage(id: number, updateLanguageDto: UpdateLanguageDto): Promise<Language> {
    const language = await this.LanguageRepository.findOne({ where: { id } });
    if (!language) {
      throw new NotFoundException(`Language with id ${id} not found`);
    }
    language.languageName = updateLanguageDto.languageName;
    language.proficiency = updateLanguageDto.proficiency;
    return this.LanguageRepository.save(language);
  }


  async remove(id: number): Promise<void> {
    await this.LanguageRepository.delete(id);
  }

  async findLanguageByResumeId(id: number): Promise<Language[]> {
    return this.LanguageRepository.find({ where: { resume: { id } } });
  }
}