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
exports.UpdatePerInfDto = void 0;
const class_validator_1 = require("class-validator");
class UpdatePerInfDto {
}
exports.UpdatePerInfDto = UpdatePerInfDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'the name is required' }),
    (0, class_validator_1.IsString)({ message: 'the name must be a string' }),
    __metadata("design:type", String)
], UpdatePerInfDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'the objective is required' }),
    (0, class_validator_1.IsString)({ message: 'the objective must be a string' }),
    __metadata("design:type", String)
], UpdatePerInfDto.prototype, "objective", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'the email is required' }),
    (0, class_validator_1.IsString)({ message: 'the email must be a valid email' }),
    __metadata("design:type", String)
], UpdatePerInfDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'the phone number is required' }),
    (0, class_validator_1.IsString)({ message: 'the phone number must be a string' }),
    __metadata("design:type", String)
], UpdatePerInfDto.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'the location is required' }),
    (0, class_validator_1.IsString)({ message: 'the location must be a string' }),
    __metadata("design:type", String)
], UpdatePerInfDto.prototype, "location", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'the website is required' }),
    (0, class_validator_1.IsString)({ message: 'the website must be a string' }),
    __metadata("design:type", String)
], UpdatePerInfDto.prototype, "website", void 0);
//# sourceMappingURL=update-per-inf.dto.js.map