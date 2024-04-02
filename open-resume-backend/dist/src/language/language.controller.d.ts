import { LanguageService } from './language.service';
import { CreateLanguageDto } from './dto/create-language.dto';
import { Language } from './entities/language.entity';
import { UpdateLanguageDto } from './dto/update-language.dto';
export declare class LanguageController {
    private readonly languageService;
    constructor(languageService: LanguageService);
    createLanguage(createLanguageDtoArray: CreateLanguageDto[]): Promise<Language[]>;
    updateLanguage(id: number, updateLanguageDto: UpdateLanguageDto): Promise<Language>;
    findLanguageByResumeId(id: number): Promise<{
        languages: Language[];
        count: number;
    }>;
    remove(id: string): Promise<void>;
    findLanguage(language: string): Promise<{
        languages: {
            id: number;
            resumeid: number;
            language: string;
            descriptions: string;
        }[];
    }>;
}
