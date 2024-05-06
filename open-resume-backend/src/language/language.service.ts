import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLanguageDto } from './dto/create-language.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Language } from './entities/language.entity';
import { Resume } from 'src/resume/entities/resume.entity';
import { UpdateLanguageDto } from './dto/update-language.dto';
import { FindOperator, In, ILike } from 'typeorm';

@Injectable()
export class LanguageService {

  constructor(
    @InjectRepository(Language)
    private LanguageRepository: Repository<Language>,
    @InjectRepository(Resume)
    private ResumeRepository: Repository<Resume>,
  ) {}


  async createLanguage(createLanguageDtoArray: CreateLanguageDto[]): Promise<Language[]> {
    const LanguagePromises = createLanguageDtoArray.map(async (createLanguageDto) => {
      const { resumeid, ...rest } = createLanguageDto;
      const resume = await this.ResumeRepository.findOne({ where: { id: resumeid } });
      if (!resume) {
        throw new NotFoundException('Resume not found');
      }
      const Language = this.LanguageRepository.create(rest);
      Language.resume = resume;
      return this.LanguageRepository.save(Language);
    });
  
    return await Promise.all(LanguagePromises);
  }
  async updateLanguage(id: number, updateLanguageDto: UpdateLanguageDto): Promise<Language> {
    const language = await this.LanguageRepository.findOne({ where: { id } });
    if (!language) {
      throw new NotFoundException(`Language with id ${id} not found`);
    }
    language.language = updateLanguageDto.language;
    language.descriptions = updateLanguageDto.descriptions;
    return this.LanguageRepository.save(language);
  }


  async remove(id: number): Promise<void> {
    await this.LanguageRepository.delete({ resume: { id } });
  }

  async findLanguageByResumeId(id: number): Promise<Language[]> {
    return this.LanguageRepository.find({ where: { resume: { id } } });
  }
  async findLanguage(language: string): Promise<{ id: number, resumeid: number, language: string, descriptions: string }[]> {
    const languages = await this.LanguageRepository
      .createQueryBuilder('language')
      .select(['language.id', 'resume.id as resumeid', 'language.language', 'language.descriptions']) // Modifier pour utiliser "descriptions"
      .leftJoin('language.resume', 'resume')
      .where('language.language ILIKE :language', { language: `%${language}%` })
      .getRawMany();
  
    return languages.map(language => ({
      id: language.id,
      resumeid: language.resumeid,
      language: language.language,
      descriptions: language.descriptions
    }));
  }

  
}