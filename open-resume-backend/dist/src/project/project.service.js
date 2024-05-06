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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const project_entity_1 = require("./entities/project.entity");
const typeorm_2 = require("typeorm");
const resume_entity_1 = require("../resume/entities/resume.entity");
let ProjectService = class ProjectService {
    constructor(ProjectRepository, ResumeRepository) {
        this.ProjectRepository = ProjectRepository;
        this.ResumeRepository = ResumeRepository;
    }
    async createProject(createProjectDtoArray) {
        const createdProjects = [];
        for (const createProjectDto of createProjectDtoArray) {
            const { resumeid, ...rest } = createProjectDto;
            const resume = await this.ResumeRepository.findOne({ where: { id: resumeid } });
            if (!resume) {
                throw new common_1.NotFoundException('Resume not found');
            }
            const project = this.ProjectRepository.create({ ...rest, resume });
            createdProjects.push(await this.ProjectRepository.save(project));
        }
        return createdProjects;
    }
    async updateProject(id, updateProjectDto) {
        const project = await this.ProjectRepository.findOne({ where: { id } });
        if (!project) {
            throw new common_1.NotFoundException(`Project with id ${id} not found`);
        }
        project.project = updateProjectDto.project;
        project.date = updateProjectDto.date;
        project.descriptions = updateProjectDto.descriptions;
        return this.ProjectRepository.save(project);
    }
    async findProjectByResumeId(id) {
        return this.ProjectRepository.find({ where: { resume: { id } } });
    }
    async remove(id) {
        await this.ProjectRepository.delete({ resume: { id } });
    }
};
exports.ProjectService = ProjectService;
exports.ProjectService = ProjectService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(project_entity_1.Project)),
    __param(1, (0, typeorm_1.InjectRepository)(resume_entity_1.Resume)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ProjectService);
//# sourceMappingURL=project.service.js.map