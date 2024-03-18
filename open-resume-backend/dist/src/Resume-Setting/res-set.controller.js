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
exports.ResSetController = void 0;
const common_1 = require("@nestjs/common");
const res_set_service_1 = require("./res-set.service");
const create_res_set_dto_1 = require("./dto/create-res-set.dto");
const update_res_set_dto_1 = require("./dto/update-res-set.dto");
let ResSetController = class ResSetController {
    constructor(resSetService) {
        this.resSetService = resSetService;
    }
    async craeteResSet(createResSetDto) {
        const resset = await this.resSetService.createResSet(createResSetDto);
        return { resset };
    }
    async updateResSet(id, updateResSetDto) {
        return this.resSetService.updateResSet(id, updateResSetDto);
    }
    async findResSetByResumeId(id) {
        const ressets = await this.resSetService.findResSetByResumeId(id);
        const count = ressets.length;
        return { ressets, count };
    }
    remove(id) {
        return this.resSetService.remove(+id);
    }
};
exports.ResSetController = ResSetController;
__decorate([
    (0, common_1.Post)('createSkills'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_res_set_dto_1.CreateResSetDto]),
    __metadata("design:returntype", Promise)
], ResSetController.prototype, "craeteResSet", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_res_set_dto_1.UpdateResSetDto]),
    __metadata("design:returntype", Promise)
], ResSetController.prototype, "updateResSet", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ResSetController.prototype, "findResSetByResumeId", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ResSetController.prototype, "remove", null);
exports.ResSetController = ResSetController = __decorate([
    (0, common_1.Controller)('res-set'),
    __metadata("design:paramtypes", [res_set_service_1.ResSetService])
], ResSetController);
//# sourceMappingURL=res-set.controller.js.map