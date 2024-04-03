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
exports.ResumeService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const resume_entity_1 = require("./entities/resume.entity");
const user_entity_1 = require("../users/entities/user.entity");
let ResumeService = class ResumeService {
    constructor(ResumeRepository, UserRepository) {
        this.ResumeRepository = ResumeRepository;
        this.UserRepository = UserRepository;
    }
    async createResume(createResumeDto) {
        const user = await this.UserRepository.findOne({ where: { id: createResumeDto.userid } });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const Resume = this.ResumeRepository.create(createResumeDto);
        Resume.user = user;
        return this.ResumeRepository.save(Resume);
    }
    async updateName(id, updateResumeNameDto) {
        const resume = await this.ResumeRepository.findOne({ where: { id } });
        if (!resume) {
            throw new common_1.NotFoundException('Resume not found');
        }
        resume.name = updateResumeNameDto.name;
        return this.ResumeRepository.save(resume);
    }
    async findResumeByUserId(id) {
        return this.ResumeRepository.find({ where: { user: { id } } });
    }
    async findOne(id) {
        const options = { where: { id } };
        const resume = await this.ResumeRepository.findOne(options);
        if (!resume)
            throw new common_1.NotFoundException('User not found');
        return resume;
    }
    async remove(id) {
        await this.ResumeRepository.delete(id);
    }
    async getAllResumesWithDetails() {
        return this.ResumeRepository.find({
            relations: ['user', 'perInf', 'Education', 'projects', 'workExp', 'skills', 'resSet', 'CusSec', 'Language'],
        });
    }
};
exports.ResumeService = ResumeService;
exports.ResumeService = ResumeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(resume_entity_1.Resume)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ResumeService);
//# sourceMappingURL=resume.service.js.map