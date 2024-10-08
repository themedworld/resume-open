"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkExpModule = void 0;
const work_exp_entity_1 = require("./entities/work-exp.entity");
const common_1 = require("@nestjs/common");
const work_exp_service_1 = require("./work-exp.service");
const work_exp_controller_1 = require("./work-exp.controller");
const typeorm_1 = require("@nestjs/typeorm");
const resume_module_1 = require("../resume/resume.module");
let WorkExpModule = class WorkExpModule {
};
exports.WorkExpModule = WorkExpModule;
exports.WorkExpModule = WorkExpModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([work_exp_entity_1.WorkExp]), resume_module_1.ResumeModule,
        ],
        controllers: [work_exp_controller_1.WorkExpController],
        providers: [work_exp_service_1.WorkExpService],
    })
], WorkExpModule);
//# sourceMappingURL=work-exp.module.js.map