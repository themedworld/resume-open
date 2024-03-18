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
exports.UpdateEducationDto = void 0;
const class_validator_1 = require("class-validator");
class UpdateEducationDto {
}
exports.UpdateEducationDto = UpdateEducationDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'is required' }),
    (0, class_validator_1.IsString)({ message: 'the school name must be a string' }),
    __metadata("design:type", String)
], UpdateEducationDto.prototype, "school", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'the education date is required' }),
    (0, class_validator_1.IsDate)({ message: 'the education date must be a date' }),
    __metadata("design:type", Date)
], UpdateEducationDto.prototype, "date", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'the degree is required' }),
    (0, class_validator_1.IsString)({ message: 'the degree must be a string' }),
    __metadata("design:type", String)
], UpdateEducationDto.prototype, "degree", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'the GPA must be a string' }),
    __metadata("design:type", String)
], UpdateEducationDto.prototype, "gpa", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'additional information must be a string' }),
    __metadata("design:type", String)
], UpdateEducationDto.prototype, "additionalInformation", void 0);
//# sourceMappingURL=update-education.dto.js.map