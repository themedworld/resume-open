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
const photo_service_1 = require("../photo/photo.service");
const resumeimage_service_1 = require("../resumeimage/resumeimage.service");
let ResumeController = class ResumeController {
    constructor(resumeService, usersService, educationService, languageService, perInfService, projectService, resSetService, skillsService, workExpService, cusSecService, uploadedFileService, resumeimageService) {
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
        this.uploadedFileService = uploadedFileService;
        this.resumeimageService = resumeimageService;
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
            const { name, id } = user;
            const resumes = await this.resumeService.findResumeByUserId(user.id);
            const resumesWithDetails = await Promise.all(resumes.map(async (resume) => {
                const perInfs = await this.perInfService.findPerInfByResumeId(resume.id);
                const location = perInfs ? perInfs.location : null;
                const languages = await this.languageService.findLanguageByResumeId(resume.id);
                const Languagess = languages.map(Language => ({ Language: Language.language }));
                const skills = await this.skillsService.findSkillsByResumeId(resume.id);
                const featuredSkills = skills.map(skill => ({ skill: skill.featuredSkills }));
                const WorkExps = await this.workExpService.findWorkExpByResumeId(resume.id);
                const workExpsWithJobTitles = WorkExps.map(workExp => ({ jobTitle: workExp.jobTitle }));
                return { resume, location, languagess: Languagess, jobTitle: workExpsWithJobTitles, featuredSkills: featuredSkills };
            }));
            return { user: { name, id }, resumes: resumesWithDetails };
        }));
        return usersWithResumes;
    }
    async getResumeById(resumeId) {
        const resume = await this.resumeService.findOne(resumeId);
        if (!resume) {
            throw new common_1.NotFoundException("CV non trouvé");
        }
        const perInfs = await this.perInfService.findPerInfByResumeId(resumeId);
        const educations = await this.educationService.findEducationByResumeId(resumeId);
        const languages = await this.languageService.findLanguageByResumeId(resumeId);
        const projects = await this.projectService.findProjectByResumeId(resumeId);
        const skills = await this.skillsService.findSkillsByResumeId(resumeId);
        const workExps = await this.workExpService.findWorkExpByResumeId(resumeId);
        const cusSecs = await this.cusSecService.findCusSecByResumeId(resumeId);
        const resSet = await this.resSetService.findResSetByResumeId(resumeId);
        return {
            resume,
            ResumeProfile: perInfs,
            educations,
            languages,
            projects,
            workExperiences: workExps,
            skills,
            custom: cusSecs,
            Setting: resSet,
        };
    }
    async getUserResumes(userId) {
        const resumes = await this.resumeService.findResumeByUserId(userId);
        const count = resumes.length;
        if (resumes.length === 0) {
            throw new common_1.NotFoundException('Aucun CV trouvé pour cet utilisateur');
        }
        const resumesWithDetails = await Promise.all(resumes.map(async (resume) => {
            const perInfs = await this.perInfService.findPerInfByResumeId(resume.id);
            const photo = await this.uploadedFileService.findPhotoByResumeId(resume.id);
            const Resumeimage = await this.resumeimageService.findPhotoByResumeId(resume.id);
            return {
                resume,
                ResumeProfile: perInfs,
                Photo: photo,
                Resumeimage: Resumeimage,
            };
        }));
        return { resumesWithDetails, count };
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
__decorate([
    (0, common_1.Get)("UpdateView/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ResumeController.prototype, "getResumeById", null);
__decorate([
    (0, common_1.Get)(':userId/resumes'),
    __param(0, (0, common_1.Param)('userId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ResumeController.prototype, "getUserResumes", null);
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
        cus_sec_service_1.CusSecService,
        photo_service_1.UploadedFileService,
        resumeimage_service_1.ResumeimageService])
], ResumeController);
//# sourceMappingURL=resume.controller.js.map