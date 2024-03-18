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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Resume = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../users/entities/user.entity");
const per_inf_entity_1 = require("../../Personal-information/entities/per-inf.entity");
const education_entity_1 = require("../../education/entities/education.entity");
const project_entity_1 = require("../../project/entities/project.entity");
const work_exp_entity_1 = require("../../work-experience/entities/work-exp.entity");
const skill_entity_1 = require("../../skills/entities/skill.entity");
const res_set_entity_1 = require("../../Resume-Setting/entities/res-set.entity");
const cus_sec_entity_1 = require("../../Custumer-serction/entities/cus-sec.entity");
const language_entity_1 = require("../../language/entities/language.entity");
let Resume = class Resume {
};
exports.Resume = Resume;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Resume.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, (User) => User.resume),
    (0, typeorm_1.JoinColumn)({ name: 'iduser' }),
    __metadata("design:type", user_entity_1.UserEntity)
], Resume.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Resume.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => per_inf_entity_1.PerInf, (perInf) => perInf.resume),
    __metadata("design:type", per_inf_entity_1.PerInf)
], Resume.prototype, "perInf", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => education_entity_1.Education, (Education) => Education.resume),
    __metadata("design:type", Array)
], Resume.prototype, "Education", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => project_entity_1.Project, (project) => project.resume),
    __metadata("design:type", Array)
], Resume.prototype, "projects", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => work_exp_entity_1.WorkExp, (workExp) => workExp.resume),
    __metadata("design:type", Array)
], Resume.prototype, "workExp", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => skill_entity_1.Skills, (skills) => skills.resume),
    __metadata("design:type", Array)
], Resume.prototype, "skills", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => res_set_entity_1.ResSet, (resSet) => resSet.resume),
    __metadata("design:type", res_set_entity_1.ResSet)
], Resume.prototype, "resSet", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => cus_sec_entity_1.CusSec, (CusSec) => CusSec.resume),
    __metadata("design:type", cus_sec_entity_1.CusSec)
], Resume.prototype, "CusSec", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => language_entity_1.Language, (Language) => Language.resume),
    __metadata("design:type", Array)
], Resume.prototype, "Language", void 0);
exports.Resume = Resume = __decorate([
    (0, typeorm_1.Entity)()
], Resume);
//# sourceMappingURL=resume.entity.js.map