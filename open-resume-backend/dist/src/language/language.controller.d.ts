import { LanguageService } from './language.service';
import { CreateLanguageDto } from './dto/create-language.dto';
import { Language } from './entities/language.entity';
import { UpdateLanguageDto } from './dto/update-language.dto';
export declare class LanguageController {
    private readonly languageService;
    constructor(languageService: LanguageService);
    craeteLanguage(createLanguageDto: CreateLanguageDto): Promise<{
        language: Language;
    }>;
    updateLanguage(id: number, updateLanguageDto: UpdateLanguageDto): Promise<Language>;
    findLanguageByResumeId(id: number): Promise<{
        languages: Language[];
        count: number;
    }>;
    remove(id: string): Promise<void>;
}
