"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CusSecModule = void 0;
const cus_sec_entity_1 = require("./entities/cus-sec.entity");
const common_1 = require("@nestjs/common");
const cus_sec_service_1 = require("./cus-sec.service");
const cus_sec_controller_1 = require("./cus-sec.controller");
const typeorm_1 = require("@nestjs/typeorm");
const resume_module_1 = require("../resume/resume.module");
let CusSecModule = class CusSecModule {
};
exports.CusSecModule = CusSecModule;
exports.CusSecModule = CusSecModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([cus_sec_entity_1.CusSec]), resume_module_1.ResumeModule
        ],
        controllers: [cus_sec_controller_1.CusSecController],
        providers: [cus_sec_service_1.CusSecService],
    })
], CusSecModule);
//# sourceMappingURL=cus-sec.module.js.map