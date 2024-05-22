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
exports.ResumeimageService = void 0;
const common_1 = require("@nestjs/common");
const resume_entity_1 = require("../resume/entities/resume.entity");
const resumeimage_entity_1 = require("./entities/resumeimage.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const common_2 = require("@nestjs/common");
let ResumeimageService = class ResumeimageService {
    constructor(ResumeimageRepository, resumeRepository) {
        this.ResumeimageRepository = ResumeimageRepository;
        this.resumeRepository = resumeRepository;
    }
    async createResumeimage(createResumeimageDto) {
        const resume = await this.resumeRepository.findOne({ where: { id: createResumeimageDto.resumeid } });
        if (!resume) {
            throw new common_2.NotFoundException('Resume not found');
        }
        const Resumeimage = this.ResumeimageRepository.create(createResumeimageDto);
        Resumeimage.resume = resume;
        return this.ResumeimageRepository.save(Resumeimage);
    }
    findAll() {
        return `This action returns all resumeimage`;
    }
    findOne(id) {
        return `This action returns a #${id} resumeimage`;
    }
    async remove(id) {
        await this.ResumeimageRepository.delete({ resume: { id } });
    }
    async findPhotoByResumeId(id) {
        return this.ResumeimageRepository.findOne({ where: { resume: { id } } });
    }
};
exports.ResumeimageService = ResumeimageService;
exports.ResumeimageService = ResumeimageService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(resumeimage_entity_1.Resumeimage)),
    __param(1, (0, typeorm_1.InjectRepository)(resume_entity_1.Resume)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ResumeimageService);
//# sourceMappingURL=resumeimage.service.js.map