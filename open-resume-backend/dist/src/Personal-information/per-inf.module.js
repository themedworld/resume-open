"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PerInfModule = void 0;
const per_inf_entity_1 = require("./entities/per-inf.entity");
const common_1 = require("@nestjs/common");
const per_inf_service_1 = require("./per-inf.service");
const per_inf_controller_1 = require("./per-inf.controller");
const typeorm_1 = require("@nestjs/typeorm");
const resume_module_1 = require("../resume/resume.module");
let PerInfModule = class PerInfModule {
};
exports.PerInfModule = PerInfModule;
exports.PerInfModule = PerInfModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([per_inf_entity_1.PerInf]), resume_module_1.ResumeModule,
        ],
        controllers: [per_inf_controller_1.PerInfController],
        providers: [per_inf_service_1.PerInfService],
    })
], PerInfModule);
//# sourceMappingURL=per-inf.module.js.map