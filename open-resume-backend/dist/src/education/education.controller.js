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
exports.EducationController = void 0;
const common_1 = require("@nestjs/common");
const education_service_1 = require("./education.service");
const create_education_dto_1 = require("./dto/create-education.dto");
const update_education_dto_1 = require("./dto/update-education.dto");
let EducationController = class EducationController {
    constructor(educationService) {
        this.educationService = educationService;
    }
    async createEducation(createEducationDto) {
        const education = await this.educationService.createEducation(createEducationDto);
        return { education };
    }
    async updateEducation(id, updateEducationDto) {
        return this.educationService.updateEducation(id, updateEducationDto);
    }
    async findEducationByResumeId(id) {
        const educations = await this.educationService.findEducationByResumeId(id);
        const count = educations.length;
        return { educations, count };
    }
    remove(id) {
        return this.educationService.remove(+id);
    }
};
exports.EducationController = EducationController;
__decorate([
    (0, common_1.Post)('createEducation'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_education_dto_1.CreateEducationDto]),
    __metadata("design:returntype", Promise)
], EducationController.prototype, "createEducation", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_education_dto_1.UpdateEducationDto]),
    __metadata("design:returntype", Promise)
], EducationController.prototype, "updateEducation", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], EducationController.prototype, "findEducationByResumeId", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EducationController.prototype, "remove", null);
exports.EducationController = EducationController = __decorate([
    (0, common_1.Controller)('education'),
    __metadata("design:paramtypes", [education_service_1.EducationService])
], EducationController);
//# sourceMappingURL=education.controller.js.map