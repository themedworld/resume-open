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
exports.UploadedFileController = void 0;
const common_1 = require("@nestjs/common");
const photo_service_1 = require("./photo.service");
const create_photo_dto_1 = require("./dto/create-photo.dto");
let UploadedFileController = class UploadedFileController {
    constructor(uploadedFileService) {
        this.uploadedFileService = uploadedFileService;
    }
    async createPhoto(photoDto) {
        try {
            const fileBuffer = Buffer.from(photoDto.fileUrl, 'base64');
            const photo = await this.uploadedFileService.createPhoto(photoDto, fileBuffer);
            return { photo };
        }
        catch (error) {
            throw new common_1.HttpException(`Failed to create photo: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.UploadedFileController = UploadedFileController;
__decorate([
    (0, common_1.Post)('createPhoto'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_photo_dto_1.PhotoDto]),
    __metadata("design:returntype", Promise)
], UploadedFileController.prototype, "createPhoto", null);
exports.UploadedFileController = UploadedFileController = __decorate([
    (0, common_1.Controller)("uploaded-files"),
    __metadata("design:paramtypes", [photo_service_1.UploadedFileService])
], UploadedFileController);
//# sourceMappingURL=photo.controller.js.map