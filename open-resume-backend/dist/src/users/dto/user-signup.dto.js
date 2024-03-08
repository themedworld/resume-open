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
exports.UserSignupDto = void 0;
const class_validator_1 = require("class-validator");
const user_signin_dto_1 = require("./user-signin.dto");
class UserSignupDto extends user_signin_dto_1.UserSignInDto {
}
exports.UserSignupDto = UserSignupDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: "L'adresse e-mail est requise" }),
    (0, class_validator_1.IsEmail)({}, { message: "L'adresse e-mail doit être valide" }),
    __metadata("design:type", String)
], UserSignupDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: "Le nom doit être une chaîne de caractères" }),
    __metadata("design:type", String)
], UserSignupDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: "Le numéro de téléphone doit être une chaîne de caractères" }),
    __metadata("design:type", String)
], UserSignupDto.prototype, "numtel", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: "Le nom de l'entreprise doit être une chaîne de caractères" }),
    __metadata("design:type", String)
], UserSignupDto.prototype, "companyname", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: "L'adresse doit être une chaîne de caractères" }),
    __metadata("design:type", String)
], UserSignupDto.prototype, "adresse", void 0);
//# sourceMappingURL=user-signup.dto.js.map