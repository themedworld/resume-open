"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResSetModule = void 0;
const res_set_entity_1 = require("./entities/res-set.entity");
const common_1 = require("@nestjs/common");
const res_set_service_1 = require("./res-set.service");
const res_set_controller_1 = require("./res-set.controller");
const typeorm_1 = require("@nestjs/typeorm");
const resume_module_1 = require("../resume/resume.module");
let ResSetModule = class ResSetModule {
};
exports.ResSetModule = ResSetModule;
exports.ResSetModule = ResSetModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([res_set_entity_1.ResSet]), resume_module_1.ResumeModule
        ],
        controllers: [res_set_controller_1.ResSetController],
        providers: [res_set_service_1.ResSetService],
    })
], ResSetModule);
//# sourceMappingURL=res-set.module.js.map