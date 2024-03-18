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
exports.PerInfController = void 0;
const common_1 = require("@nestjs/common");
const per_inf_service_1 = require("./per-inf.service");
const create_per_inf_dto_1 = require("./dto/create-per-inf.dto");
const update_per_inf_dto_1 = require("./dto/update-per-inf.dto");
let PerInfController = class PerInfController {
    constructor(perInfService) {
        this.perInfService = perInfService;
    }
    async craetePerInf(createPerInfDto) {
        const perinf = await this.perInfService.createPerInf(createPerInfDto);
        return { perinf };
    }
    async updatePerInf(id, updatePerInfDto) {
        return this.perInfService.updatePerInf(id, updatePerInfDto);
    }
    async findPerInfByResumeId(id) {
        return this.perInfService.findPerInfByResumeId(parseInt(id));
    }
    remove(id) {
        return this.perInfService.remove(+id);
    }
};
exports.PerInfController = PerInfController;
__decorate([
    (0, common_1.Post)('createPerInf'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_per_inf_dto_1.CreatePerInfDto]),
    __metadata("design:returntype", Promise)
], PerInfController.prototype, "craetePerInf", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_per_inf_dto_1.UpdatePerInfDto]),
    __metadata("design:returntype", Promise)
], PerInfController.prototype, "updatePerInf", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PerInfController.prototype, "findPerInfByResumeId", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PerInfController.prototype, "remove", null);
exports.PerInfController = PerInfController = __decorate([
    (0, common_1.Controller)('per-inf'),
    __metadata("design:paramtypes", [per_inf_service_1.PerInfService])
], PerInfController);
//# sourceMappingURL=per-inf.controller.js.map