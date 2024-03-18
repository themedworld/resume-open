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
exports.CusSecService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const cus_sec_entity_1 = require("./entities/cus-sec.entity");
const typeorm_2 = require("typeorm");
const resume_entity_1 = require("../resume/entities/resume.entity");
let CusSecService = class CusSecService {
    constructor(CusSecRepository, ResumeRepository) {
        this.CusSecRepository = CusSecRepository;
        this.ResumeRepository = ResumeRepository;
    }
    async createCusSec(createCusSecDto) {
        const resume = await this.ResumeRepository.findOne({ where: { id: createCusSecDto.resumeid } });
        if (!resume) {
            throw new common_1.NotFoundException('Resume not found');
        }
        const CusSec = this.CusSecRepository.create(createCusSecDto);
        CusSec.resume = resume;
        return this.CusSecRepository.save(CusSec);
    }
    async updateCusSec(id, updateCusSecDto) {
        const cusSec = await this.CusSecRepository.findOne({ where: { id } });
        if (!cusSec) {
            throw new common_1.NotFoundException(`CusSec with id ${id} not found`);
        }
        cusSec.Custom_Textbox = updateCusSecDto.Custom_Textbox;
        return this.CusSecRepository.save(cusSec);
    }
    async remove(id) {
        await this.CusSecRepository.delete(id);
    }
    async findCusSecByResumeId(id) {
        return this.CusSecRepository.find({ where: { resume: { id } } });
    }
};
exports.CusSecService = CusSecService;
exports.CusSecService = CusSecService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(cus_sec_entity_1.CusSec)),
    __param(1, (0, typeorm_1.InjectRepository)(resume_entity_1.Resume)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], CusSecService);
//# sourceMappingURL=cus-sec.service.js.map