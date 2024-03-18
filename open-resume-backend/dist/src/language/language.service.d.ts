import { CreateLanguageDto } from './dto/create-language.dto';
import { Repository } from 'typeorm';
import { Language } from './entities/language.entity';
import { Resume } from 'src/resume/entities/resume.entity';
import { UpdateLanguageDto } from './dto/update-language.dto';
export declare class LanguageService {
    private LanguageRepository;
    private ResumeRepository;
    constructor(LanguageRepository: Repository<Language>, ResumeRepository: Repository<Resume>);
    createLanguage(createLanguageDto: CreateLanguageDto): Promise<Language>;
    updateLanguage(id: number, updateLanguageDto: UpdateLanguageDto): Promise<Language>;
    remove(id: number): Promise<void>;
    findLanguageByResumeId(id: number): Promise<Language[]>;
}
