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
exports.work_exp = exports.CreateWorkExpDto = void 0;
const class_validator_1 = require("class-validator");
class CreateWorkExpDto {
}
exports.CreateWorkExpDto = CreateWorkExpDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'the job title is required' }),
    (0, class_validator_1.IsNumber)({}, { message: 'the job title must be a string' }),
    __metadata("design:type", Number)
], CreateWorkExpDto.prototype, "resumeid", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'the company name is required' }),
    (0, class_validator_1.IsString)({ message: 'the company name must be a string' }),
    __metadata("design:type", String)
], CreateWorkExpDto.prototype, "company", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'the job title is required' }),
    (0, class_validator_1.IsString)({ message: 'the job title must be a string' }),
    __metadata("design:type", String)
], CreateWorkExpDto.prototype, "jobTitle", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'the date is required' }),
    (0, class_validator_1.IsString)({ message: 'the date must be a valid date' }),
    __metadata("design:type", String)
], CreateWorkExpDto.prototype, "date", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'The descriptions array is required' }),
    (0, class_validator_1.IsArray)({ message: 'The descriptions must be an array' }),
    (0, class_validator_1.IsString)({ each: true, message: 'Each description must be a string' }),
    __metadata("design:type", Array)
], CreateWorkExpDto.prototype, "descriptions", void 0);
class work_exp {
}
exports.work_exp = work_exp;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'The job title name is required' }),
    (0, class_validator_1.IsString)({ message: 'The job title name must be a string' }),
    __metadata("design:type", String)
], work_exp.prototype, "jobtitle", void 0);
//# sourceMappingURL=create-work-exp.dto.js.map