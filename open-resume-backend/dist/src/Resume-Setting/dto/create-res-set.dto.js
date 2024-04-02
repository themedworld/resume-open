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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateResSetDto = void 0;
const class_validator_1 = require("class-validator");
class CreateResSetDto {
}
exports.CreateResSetDto = CreateResSetDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'resumeid is required' }),
    (0, class_validator_1.IsNumber)({}, { message: 'resume id must be a number' }),
    __metadata("design:type", Number)
], CreateResSetDto.prototype, "resumeid", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'theme color is required' }),
    (0, class_validator_1.IsString)({ message: 'theme color must be a string' }),
    __metadata("design:type", String)
], CreateResSetDto.prototype, "themeColor", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'the font size is required' }),
    (0, class_validator_1.IsString)({ message: 'the font size must be a string' }),
    __metadata("design:type", String)
], CreateResSetDto.prototype, "fontSize", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'the font family is required' }),
    (0, class_validator_1.IsString)({ message: 'the font family must be a string' }),
    __metadata("design:type", String)
], CreateResSetDto.prototype, "fontFamily", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'the document size is required' }),
    (0, class_validator_1.IsString)({ message: 'the document size must be a string' }),
    __metadata("design:type", String)
], CreateResSetDto.prototype, "documentSize", void 0);
//# sourceMappingURL=create-res-set.dto.js.map