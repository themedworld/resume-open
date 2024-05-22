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
exports.PerInfService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const per_inf_entity_1 = require("./entities/per-inf.entity");
const resume_entity_1 = require("../resume/entities/resume.entity");
let PerInfService = class PerInfService {
    constructor(perInfRepository, resumeRepository) {
        this.perInfRepository = perInfRepository;
        this.resumeRepository = resumeRepository;
    }
    async createPerInf(createPerInfDto) {
        const resume = await this.resumeRepository.findOne({ where: { id: createPerInfDto.resumeid } });
        if (!resume) {
            throw new common_1.NotFoundException('Resume not found');
        }
        const perInf = this.perInfRepository.create(createPerInfDto);
        perInf.resume = resume;
        return this.perInfRepository.save(perInf);
    }
    async updatePerInf(id, updatePerInfDto) {
        const perInf = await this.perInfRepository.findOne({ where: { id } });
        if (!perInf) {
            throw new common_1.NotFoundException(`PerInf with id ${id} not found`);
        }
        Object.assign(perInf, updatePerInfDto);
        return this.perInfRepository.save(perInf);
    }
    async remove(id) {
        await this.perInfRepository.delete(id);
    }
    async findPerInfByResumeId(id) {
        return this.perInfRepository.findOne({ where: { resume: { id } } });
    }
    async findLocation(location) {
        const perInf = await this.perInfRepository
            .createQueryBuilder('perInf')
            .select([
            'perInf.id',
            'resume.id AS resumeid',
            'perInf.name',
            'perInf.summary',
            'perInf.email',
            'perInf.phone',
            'perInf.location',
            'perInf.url',
        ])
            .leftJoin('perInf.resume', 'resume')
            .where('perInf.location ILIKE :location', { location: `%${location}%` })
            .getRawMany();
        return perInf.map((item) => ({
            id: item.id,
            resumeid: item.resumeid,
            name: item.name,
            summary: item.summary,
            email: item.email,
            phone: item.phone,
            location: item.location,
            url: item.url,
        }));
    }
};
exports.PerInfService = PerInfService;
exports.PerInfService = PerInfService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(per_inf_entity_1.PerInf)),
    __param(1, (0, typeorm_1.InjectRepository)(resume_entity_1.Resume)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], PerInfService);
//# sourceMappingURL=per-inf.service.js.map