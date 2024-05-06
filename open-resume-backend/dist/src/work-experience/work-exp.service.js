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
exports.WorkExpService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const work_exp_entity_1 = require("./entities/work-exp.entity");
const typeorm_2 = require("typeorm");
const resume_entity_1 = require("../resume/entities/resume.entity");
let WorkExpService = class WorkExpService {
    constructor(WorkExpRepository, ResumeRepository) {
        this.WorkExpRepository = WorkExpRepository;
        this.ResumeRepository = ResumeRepository;
    }
    async createWorkExp(createWorkExpDtoArray) {
        const WorkExpPromises = createWorkExpDtoArray.map(async (createWorkExpDto) => {
            const { resumeid, ...rest } = createWorkExpDto;
            const resume = await this.ResumeRepository.findOne({ where: { id: resumeid } });
            if (!resume) {
                throw new common_1.NotFoundException('Resume not found');
            }
            const WorkExp = this.WorkExpRepository.create(rest);
            WorkExp.resume = resume;
            return this.WorkExpRepository.save(WorkExp);
        });
        return await Promise.all(WorkExpPromises);
    }
    async updateWorkExp(id, updateWorkExpDto) {
        const workExp = await this.WorkExpRepository.findOne({ where: { id } });
        if (!workExp) {
            throw new common_1.NotFoundException(`WorkExp with id ${id} not found`);
        }
        workExp.company = updateWorkExpDto.company;
        workExp.jobTitle = updateWorkExpDto.jobTitle;
        workExp.date = updateWorkExpDto.date;
        workExp.descriptions = updateWorkExpDto.descriptions;
        return this.WorkExpRepository.save(workExp);
    }
    async findWorkExpByResumeId(id) {
        return this.WorkExpRepository.find({ where: { resume: { id } } });
    }
    async remove(id) {
        await this.WorkExpRepository.delete({ resume: { id } });
    }
};
exports.WorkExpService = WorkExpService;
exports.WorkExpService = WorkExpService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(work_exp_entity_1.WorkExp)),
    __param(1, (0, typeorm_1.InjectRepository)(resume_entity_1.Resume)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], WorkExpService);
//# sourceMappingURL=work-exp.service.js.map