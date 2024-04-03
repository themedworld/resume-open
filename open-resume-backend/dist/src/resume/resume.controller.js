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
const users_service_1 = require("../users/users.service");
const cus_sec_service_1 = require("../Custumer-serction/cus-sec.service");
const education_service_1 = require("../education/education.service");
const language_service_1 = require("../language/language.service");
const per_inf_service_1 = require("../Personal-information/per-inf.service");
const project_service_1 = require("../project/project.service");
const res_set_service_1 = require("../Resume-Setting/res-set.service");
const skills_service_1 = require("../skills/skills.service");
const work_exp_service_1 = require("../work-experience/work-exp.service");
let ResumeController = class ResumeController {
    constructor(resumeService, usersService, educationService, languageService, perInfService, projectService, resSetService, skillsService, workExpService, cusSecService) {
        this.resumeService = resumeService;
        this.usersService = usersService;
        this.educationService = educationService;
        this.languageService = languageService;
        this.perInfService = perInfService;
        this.projectService = projectService;
        this.resSetService = resSetService;
        this.skillsService = skillsService;
        this.workExpService = workExpService;
        this.cusSecService = cusSecService;
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
    findOne(id) {
        return this.resumeService.findOne(+id);
    }
    async updateName(id, updateResumeNameDto) {
        return this.resumeService.updateName(id, updateResumeNameDto);
    }
    remove(id) {
        return this.resumeService.remove(+id);
    }
    async getAllResumes() {
        const users = await this.usersService.findUsersByRole('demandeur');
        const usersWithResumes = await Promise.all(users.map(async (user) => {
            const resumes = await this.resumeService.findResumeByUserId(user.id);
            const resumesWithDetails = await Promise.all(resumes.map(async (resume) => {
                const perInfs = await this.perInfService.findPerInfByResumeId(resume.id);
                const educations = await this.educationService.findEducationByResumeId(resume.id);
                const languages = await this.languageService.findLanguageByResumeId(resume.id);
                const projects = await this.projectService.findProjectByResumeId(resume.id);
                const skills = await this.skillsService.findSkillsByResumeId(resume.id);
                const WorkExps = await this.workExpService.findWorkExpByResumeId(resume.id);
                const cusSecs = await this.cusSecService.findCusSecByResumeId(resume.id);
                const resSets = await this.resSetService.findResSetByResumeId(resume.id);
                return { resume, perInfs, educations, languages, projects, WorkExps, skills, cusSecs, resSets };
            }));
            return { user, resumes: resumesWithDetails };
        }));
        return usersWithResumes;
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
    (0, common_1.Get)('resume/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ResumeController.prototype, "findOne", null);
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
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ResumeController.prototype, "getAllResumes", null);
exports.ResumeController = ResumeController = __decorate([
    (0, common_1.Controller)('resume'),
    __metadata("design:paramtypes", [resume_service_1.ResumeService,
        users_service_1.UsersService,
        education_service_1.EducationService,
        language_service_1.LanguageService,
        per_inf_service_1.PerInfService,
        project_service_1.ProjectService,
        res_set_service_1.ResSetService,
        skills_service_1.SkillsService,
        work_exp_service_1.WorkExpService,
        cus_sec_service_1.CusSecService])
], ResumeController);
//# sourceMappingURL=resume.controller.js.map