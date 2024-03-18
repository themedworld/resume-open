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
exports.CusSecController = void 0;
const common_1 = require("@nestjs/common");
const cus_sec_service_1 = require("./cus-sec.service");
const create_cus_sec_dto_1 = require("./dto/create-cus-sec.dto");
const update_cussec_dto_1 = require("./dto/update-cussec.dto");
let CusSecController = class CusSecController {
    constructor(cusSecService) {
        this.cusSecService = cusSecService;
    }
    async createCusSec(createCusSecDto) {
        const cussec = await this.cusSecService.createCusSec(createCusSecDto);
        return { cussec };
    }
    async updateCusSec(id, updateCusSecDto) {
        return this.cusSecService.updateCusSec(id, updateCusSecDto);
    }
    remove(id) {
        return this.cusSecService.remove(+id);
    }
    async findCusSecByResumeId(id) {
        const cusSecs = await this.cusSecService.findCusSecByResumeId(id);
        const count = cusSecs.length;
        return { cusSecs, count };
    }
};
exports.CusSecController = CusSecController;
__decorate([
    (0, common_1.Post)('create-cus-sec'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_cus_sec_dto_1.CreateCusSecDto]),
    __metadata("design:returntype", Promise)
], CusSecController.prototype, "createCusSec", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_cussec_dto_1.UpdateCusSecDto]),
    __metadata("design:returntype", Promise)
], CusSecController.prototype, "updateCusSec", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CusSecController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CusSecController.prototype, "findCusSecByResumeId", null);
exports.CusSecController = CusSecController = __decorate([
    (0, common_1.Controller)('cus-sec'),
    __metadata("design:paramtypes", [cus_sec_service_1.CusSecService])
], CusSecController);
//# sourceMappingURL=cus-sec.controller.js.map