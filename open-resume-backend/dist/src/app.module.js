"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const data_source_1 = require("../db/data-source");
const users_module_1 = require("./users/users.module");
const current_user_middleware_1 = require("./utility/middlewares/current-user.middleware");
const resume_module_1 = require("./resume/resume.module");
const per_inf_module_1 = require("./Personal-information/per-inf.module");
const cus_sec_module_1 = require("./Custumer-serction/cus-sec.module");
const education_module_1 = require("./education/education.module");
const language_module_1 = require("./language/language.module");
const project_module_1 = require("./project/project.module");
const res_set_module_1 = require("./Resume-Setting/res-set.module");
const skills_module_1 = require("./skills/skills.module");
const work_exp_module_1 = require("./work-experience/work-exp.module");
const photo_module_1 = require("./photo/photo.module");
const message_module_1 = require("./message/message.module");
const resumeimage_module_1 = require("./resumeimage/resumeimage.module");
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(current_user_middleware_1.CurrentUserMiddleware)
            .forRoutes({ path: '*', method: common_1.RequestMethod.ALL });
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forRoot(data_source_1.dataSourceOptions), users_module_1.UsersModule, resume_module_1.ResumeModule, per_inf_module_1.PerInfModule, cus_sec_module_1.CusSecModule, education_module_1.EducationModule, language_module_1.LanguageModule, project_module_1.ProjectModule, res_set_module_1.ResSetModule, skills_module_1.SkillsModule, work_exp_module_1.WorkExpModule, photo_module_1.PhotoModule, message_module_1.MessageModule, resumeimage_module_1.ResumeimageModule],
        controllers: [],
        providers: [],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map