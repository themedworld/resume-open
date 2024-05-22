"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResumeimageModule = void 0;
const common_1 = require("@nestjs/common");
const resumeimage_service_1 = require("./resumeimage.service");
const resumeimage_controller_1 = require("./resumeimage.controller");
const resumeimage_entity_1 = require("./entities/resumeimage.entity");
const typeorm_1 = require("@nestjs/typeorm");
const resume_module_1 = require("../resume/resume.module");
let ResumeimageModule = class ResumeimageModule {
};
exports.ResumeimageModule = ResumeimageModule;
exports.ResumeimageModule = ResumeimageModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([resumeimage_entity_1.Resumeimage]), resume_module_1.ResumeModule,
        ],
        controllers: [resumeimage_controller_1.ResumeimageController],
        providers: [resumeimage_service_1.ResumeimageService],
    })
], ResumeimageModule);
//# sourceMappingURL=resumeimage.module.js.map