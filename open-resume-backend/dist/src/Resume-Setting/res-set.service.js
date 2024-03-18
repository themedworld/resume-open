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
exports.ResSetService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const res_set_entity_1 = require("./entities/res-set.entity");
const typeorm_2 = require("typeorm");
const resume_entity_1 = require("../resume/entities/resume.entity");
let ResSetService = class ResSetService {
    constructor(ResSetRepository, ResumeRepository) {
        this.ResSetRepository = ResSetRepository;
        this.ResumeRepository = ResumeRepository;
    }
    async createResSet(createResSetDto) {
        const resume = await this.ResumeRepository.findOne({ where: { id: createResSetDto.resumeid } });
        if (!resume) {
            throw new common_1.NotFoundException('Resume not found');
        }
        const ResSet = this.ResSetRepository.create(createResSetDto);
        ResSet.resume = resume;
        return this.ResSetRepository.save(ResSet);
    }
    async updateResSet(id, updateResSetDto) {
        const resset = await this.ResSetRepository.findOne({ where: { id } });
        if (!resset) {
            throw new common_1.NotFoundException(`Project with id ${id} not found`);
        }
        resset.themeColor = updateResSetDto.themeColor;
        resset.fontSize = updateResSetDto.fontSize;
        resset.documentSize = updateResSetDto.documentSize;
        return this.ResSetRepository.save(resset);
    }
    async findResSetByResumeId(id) {
        return this.ResSetRepository.find({ where: { resume: { id } } });
    }
    async remove(id) {
        await this.ResSetRepository.delete(id);
    }
};
exports.ResSetService = ResSetService;
exports.ResSetService = ResSetService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(res_set_entity_1.ResSet)),
    __param(1, (0, typeorm_1.InjectRepository)(resume_entity_1.Resume)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ResSetService);
//# sourceMappingURL=res-set.service.js.map