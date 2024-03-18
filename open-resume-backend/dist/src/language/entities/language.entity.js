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
exports.Language = void 0;
const typeorm_1 = require("typeorm");
const resume_entity_1 = require("../../resume/entities/resume.entity");
let Language = class Language {
};
exports.Language = Language;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Language.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Language.prototype, "languageName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Language.prototype, "proficiency", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => resume_entity_1.Resume, (resume) => resume.Language, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'resumeid' }),
    __metadata("design:type", resume_entity_1.Resume)
], Language.prototype, "resume", void 0);
exports.Language = Language = __decorate([
    (0, typeorm_1.Entity)()
], Language);
//# sourceMappingURL=language.entity.js.map