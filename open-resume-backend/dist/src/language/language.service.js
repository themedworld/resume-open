"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LanguageService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const language_entity_1 = require("./entities/language.entity");
const resume_entity_1 = require("../resume/entities/resume.entity");
let LanguageService = class LanguageService {
    constructor(LanguageRepository, ResumeRepository) {
        this.LanguageRepository = LanguageRepository;
        this.ResumeRepository = ResumeRepository;
    }
    async createLanguage(createLanguageDtoArray) {
        const LanguagePromises = createLanguageDtoArray.map(async (createLanguageDto) => {
            const { resumeid, ...rest } = createLanguageDto;
            const resume = await this.ResumeRepository.findOne({ where: { id: resumeid } });
            if (!resume) {
                throw new common_1.NotFoundException('Resume not found');
            }
            const Language = this.LanguageRepository.create(rest);
            Language.resume = resume;
            return this.LanguageRepository.save(Language);
        });
        return await Promise.all(LanguagePromises);
    }
    async updateLanguage(id, updateLanguageDto) {
        const language = await this.LanguageRepository.findOne({ where: { id } });
        if (!language) {
            throw new common_1.NotFoundException(`Language with id ${id} not found`);
        }
        language.language = updateLanguageDto.language;
        language.descriptions = updateLanguageDto.descriptions;
        return this.LanguageRepository.save(language);
    }
    async remove(id) {
        await this.LanguageRepository.delete(id);
    }
    async findLanguageByResumeId(id) {
        return this.LanguageRepository.find({ where: { resume: { id } } });
    }
    async findLanguage(language) {
        const languages = await this.LanguageRepository
            .createQueryBuilder('language')
            .select(['language.id', 'resume.id as resumeid', 'language.language', 'language.descriptions'])
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
};
exports.LanguageService = LanguageService;
exports.LanguageService = LanguageService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(language_entity_1.Language)),
    __param(1, (0, typeorm_1.InjectRepository)(resume_entity_1.Resume)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], LanguageService);
//# sourceMappingURL=language.service.js.map