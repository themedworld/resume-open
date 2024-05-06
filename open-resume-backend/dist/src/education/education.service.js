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
exports.EducationService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const education_entity_1 = require("./entities/education.entity");
const typeorm_2 = require("typeorm");
const resume_entity_1 = require("../resume/entities/resume.entity");
let EducationService = class EducationService {
    constructor(EducationRepository, ResumeRepository) {
        this.EducationRepository = EducationRepository;
        this.ResumeRepository = ResumeRepository;
    }
    async createEducation(createEducationDtoArray) {
        const educationPromises = createEducationDtoArray.map(async (createEducationDto) => {
            const { resumeid, ...rest } = createEducationDto;
            const resume = await this.ResumeRepository.findOne({ where: { id: resumeid } });
            if (!resume) {
                throw new common_1.NotFoundException('Resume not found');
            }
            const education = this.EducationRepository.create(rest);
            education.resume = resume;
            return this.EducationRepository.save(education);
        });
        return await Promise.all(educationPromises);
    }
    async updateEducation(id, updateEducationDto) {
        const education = await this.EducationRepository.findOne({ where: { id } });
        if (!education) {
            throw new common_1.NotFoundException(`Education with id ${id} not found`);
        }
        education.school = updateEducationDto.school;
        education.date = updateEducationDto.date;
        education.degree = updateEducationDto.degree;
        education.gpa = updateEducationDto.gpa;
        education.descriptions = updateEducationDto.descriptions;
        return this.EducationRepository.save(education);
    }
    async remove(id) {
        await this.EducationRepository.delete({ resume: { id } });
    }
    async findEducationByResumeId(id) {
        return this.EducationRepository.find({ where: { resume: { id } } });
    }
};
exports.EducationService = EducationService;
exports.EducationService = EducationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(education_entity_1.Education)),
    __param(1, (0, typeorm_1.InjectRepository)(resume_entity_1.Resume)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], EducationService);
//# sourceMappingURL=education.service.js.map