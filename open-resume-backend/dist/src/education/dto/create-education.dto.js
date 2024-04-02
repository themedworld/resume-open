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
exports.CreateEducationDto = void 0;
const class_validator_1 = require("class-validator");
class CreateEducationDto {
}
exports.CreateEducationDto = CreateEducationDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)({}),
    __metadata("design:type", Number)
], CreateEducationDto.prototype, "resumeid", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'School name is required' }),
    (0, class_validator_1.IsString)({ message: 'School name must be a string' }),
    __metadata("design:type", String)
], CreateEducationDto.prototype, "school", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Education date is required' }),
    (0, class_validator_1.IsString)({ message: 'Education date must be a string' }),
    __metadata("design:type", String)
], CreateEducationDto.prototype, "date", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Degree is required' }),
    (0, class_validator_1.IsString)({ message: 'Degree must be a string' }),
    __metadata("design:type", String)
], CreateEducationDto.prototype, "degree", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'GPA must be a string' }),
    __metadata("design:type", String)
], CreateEducationDto.prototype, "gpa", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Additional information must be a string' }),
    __metadata("design:type", String)
], CreateEducationDto.prototype, "descriptions", void 0);
//# sourceMappingURL=create-education.dto.js.map