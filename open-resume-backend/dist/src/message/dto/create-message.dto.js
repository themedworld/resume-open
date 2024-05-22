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
exports.CreateMessageDto = void 0;
const class_validator_1 = require("class-validator");
const class_validator_2 = require("class-validator");
class CreateMessageDto {
}
exports.CreateMessageDto = CreateMessageDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'the name is required' }),
    (0, class_validator_2.IsNumber)({}, { message: 'the id user is a number' }),
    __metadata("design:type", Number)
], CreateMessageDto.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'the name is required' }),
    (0, class_validator_1.IsString)({ message: 'the name is a string' }),
    __metadata("design:type", String)
], CreateMessageDto.prototype, "Message", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'the user id is required' }),
    (0, class_validator_2.IsNumber)({}, { message: 'the id user is a number' }),
    __metadata("design:type", Number)
], CreateMessageDto.prototype, "receiver", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'the user id is required' }),
    (0, class_validator_2.IsNumber)({}, { message: 'the id user is a number' }),
    __metadata("design:type", Number)
], CreateMessageDto.prototype, "sender", void 0);
//# sourceMappingURL=create-message.dto.js.map