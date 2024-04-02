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
exports.FeaturedSkillDto = exports.UpdateSkillsDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class UpdateSkillsDto {
}
exports.UpdateSkillsDto = UpdateSkillsDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'The featuredSkills array is required' }),
    (0, class_validator_1.IsArray)({ message: 'The featuredSkills must be an array' }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => FeaturedSkillDto),
    __metadata("design:type", Array)
], UpdateSkillsDto.prototype, "featuredSkills", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'The descriptions array is required' }),
    (0, class_validator_1.IsArray)({ message: 'The descriptions must be an array' }),
    (0, class_validator_1.IsString)({ each: true, message: 'Each description must be a string' }),
    __metadata("design:type", Array)
], UpdateSkillsDto.prototype, "descriptions", void 0);
class FeaturedSkillDto {
}
exports.FeaturedSkillDto = FeaturedSkillDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'The skill name is required' }),
    (0, class_validator_1.IsString)({ message: 'The skill name must be a string' }),
    __metadata("design:type", String)
], FeaturedSkillDto.prototype, "skill", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'The rating is required' }),
    (0, class_validator_1.IsNumber)({}, { message: 'The rating must be a number' }),
    __metadata("design:type", Number)
], FeaturedSkillDto.prototype, "rating", void 0);
//# sourceMappingURL=update-skills.dto.js.map