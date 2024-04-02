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
exports.CreateProjectDto = void 0;
const class_validator_1 = require("class-validator");
class CreateProjectDto {
}
exports.CreateProjectDto = CreateProjectDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'the resume id is required' }),
    __metadata("design:type", Number)
], CreateProjectDto.prototype, "resumeid", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'the project name is required' }),
    (0, class_validator_1.IsString)({ message: 'the project name must be a string' }),
    __metadata("design:type", String)
], CreateProjectDto.prototype, "project", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'the date is required' }),
    (0, class_validator_1.IsString)({ message: 'the date must be a valid date' }),
    __metadata("design:type", String)
], CreateProjectDto.prototype, "date", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'the description is required' }),
    (0, class_validator_1.IsString)({ message: 'the description must be a string' }),
    __metadata("design:type", String)
], CreateProjectDto.prototype, "descriptions", void 0);
//# sourceMappingURL=create-project.dto.js.map