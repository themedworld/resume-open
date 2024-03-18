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
exports.ResumeController = void 0;
const common_1 = require("@nestjs/common");
const resume_service_1 = require("./resume.service");
const create_resume_dto_1 = require("./dto/create-resume.dto");
const update_resumename_dto_1 = require("./dto/update-resumename.dto");
let ResumeController = class ResumeController {
    constructor(resumeService) {
        this.resumeService = resumeService;
    }
    async createresume(createResumeDto) {
        const resume = await this.resumeService.createResume(createResumeDto);
        return { resume };
    }
    async findResumeByUserId(id) {
        const resumes = await this.resumeService.findResumeByUserId(id);
        const count = resumes.length;
        return { resumes, count };
    }
    async updateName(id, updateResumeNameDto) {
        return this.resumeService.updateName(id, updateResumeNameDto);
    }
    remove(id) {
        return this.resumeService.remove(+id);
    }
};
exports.ResumeController = ResumeController;
__decorate([
    (0, common_1.Post)('createresume'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_resume_dto_1.CreateResumeDto]),
    __metadata("design:returntype", Promise)
], ResumeController.prototype, "createresume", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ResumeController.prototype, "findResumeByUserId", null);
__decorate([
    (0, common_1.Put)(':id/name'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_resumename_dto_1.UpdateResumeNameDto]),
    __metadata("design:returntype", Promise)
], ResumeController.prototype, "updateName", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ResumeController.prototype, "remove", null);
exports.ResumeController = ResumeController = __decorate([
    (0, common_1.Controller)('resume'),
    __metadata("design:paramtypes", [resume_service_1.ResumeService])
], ResumeController);
//# sourceMappingURL=resume.controller.js.map