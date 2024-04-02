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
exports.WorkExpController = void 0;
const common_1 = require("@nestjs/common");
const work_exp_service_1 = require("./work-exp.service");
const update_work_exp_tdo_1 = require("./dto/update-work-exp.tdo");
let WorkExpController = class WorkExpController {
    constructor(workExpService) {
        this.workExpService = workExpService;
    }
    async createWorkExp(createWorkExpDtoArray) {
        return this.workExpService.createWorkExp(createWorkExpDtoArray);
    }
    async findWorkExpByResumeId(id) {
        const workexp = await this.workExpService.findResSetByResumeId(id);
        const count = workexp.length;
        return { workexp, count };
    }
    async updateWorkExp(id, updateWorkExpDto) {
        return this.workExpService.updateWorkExp(id, updateWorkExpDto);
    }
    remove(id) {
        return this.workExpService.remove(+id);
    }
};
exports.WorkExpController = WorkExpController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], WorkExpController.prototype, "createWorkExp", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], WorkExpController.prototype, "findWorkExpByResumeId", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_work_exp_tdo_1.UpdateWorkExpDto]),
    __metadata("design:returntype", Promise)
], WorkExpController.prototype, "updateWorkExp", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], WorkExpController.prototype, "remove", null);
exports.WorkExpController = WorkExpController = __decorate([
    (0, common_1.Controller)('work-exp'),
    __metadata("design:paramtypes", [work_exp_service_1.WorkExpService])
], WorkExpController);
//# sourceMappingURL=work-exp.controller.js.map