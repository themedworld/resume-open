"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResumeModule = void 0;
const common_1 = require("@nestjs/common");
const resume_service_1 = require("./resume.service");
const resume_controller_1 = require("./resume.controller");
const typeorm_1 = require("@nestjs/typeorm");
const resume_entity_1 = require("./entities/resume.entity");
const users_module_1 = require("../users/users.module");
const users_service_1 = require("../users/users.service");
const language_service_1 = require("../language/language.service");
const per_inf_service_1 = require("../Personal-information/per-inf.service");
const project_service_1 = require("../project/project.service");
const skills_service_1 = require("../skills/skills.service");
const work_exp_service_1 = require("../work-experience/work-exp.service");
const cus_sec_service_1 = require("../Custumer-serction/cus-sec.service");
const language_entity_1 = require("../language/entities/language.entity");
const per_inf_entity_1 = require("../Personal-information/entities/per-inf.entity");
const cus_sec_entity_1 = require("../Custumer-serction/entities/cus-sec.entity");
const res_set_service_1 = require("../Resume-Setting/res-set.service");
const res_set_entity_1 = require("../Resume-Setting/entities/res-set.entity");
const work_exp_entity_1 = require("../work-experience/entities/work-exp.entity");
const project_entity_1 = require("../project/entities/project.entity");
const skill_entity_1 = require("../skills/entities/skill.entity");
const education_entity_1 = require("../education/entities/education.entity");
const education_service_1 = require("../education/education.service");
let ResumeModule = class ResumeModule {
};
exports.ResumeModule = ResumeModule;
exports.ResumeModule = ResumeModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([resume_entity_1.Resume, language_entity_1.Language, per_inf_entity_1.PerInf, cus_sec_entity_1.CusSec, res_set_entity_1.ResSet, work_exp_entity_1.WorkExp, project_entity_1.Project, skill_entity_1.Skills, education_entity_1.Education]), users_module_1.UsersModule,
        ],
        controllers: [resume_controller_1.ResumeController],
        providers: [resume_service_1.ResumeService, users_service_1.UsersService, res_set_service_1.ResSetService, language_service_1.LanguageService, per_inf_service_1.PerInfService, project_service_1.ProjectService, project_service_1.ProjectService, skills_service_1.SkillsService, work_exp_service_1.WorkExpService, cus_sec_service_1.CusSecService, education_service_1.EducationService],
        exports: [typeorm_1.TypeOrmModule],
    })
], ResumeModule);
//# sourceMappingURL=resume.module.js.map