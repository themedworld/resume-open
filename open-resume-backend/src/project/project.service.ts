import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { Repository } from 'typeorm';
import { Resume } from 'src/resume/entities/resume.entity';
import { UpdateProjectDto } from './dto/update-project.dto';
@Injectable()
export class ProjectService {

  constructor(
    @InjectRepository(Project)
    private ProjectRepository: Repository<Project>,
    @InjectRepository(Resume)
    private ResumeRepository: Repository<Resume>,
  ) {}


  async createProject(createProjectDto: CreateProjectDto): Promise<Project> {
    const resume = await this.ResumeRepository.findOne({ where: { id: createProjectDto.resumeid } });
    if (!resume) {
      throw new NotFoundException('Resume not found');
    }
    const Project = this.ProjectRepository.create(createProjectDto);
    Project.resume = resume;
    return this.ProjectRepository.save(Project);
  }

  async updateProject(id: number, updateProjectDto: UpdateProjectDto): Promise<Project> {
    const project = await this.ProjectRepository.findOne({ where: { id } });
    if (!project) {
      throw new NotFoundException(`Project with id ${id} not found`);
    }
    project.projectName = updateProjectDto.projectName;
    project.date = updateProjectDto.date;
    project.description = updateProjectDto.description;
    return this.ProjectRepository.save(project);
  }
  async findProjectByResumeId(id: number): Promise<Project[]> {
    return this.ProjectRepository.find({ where: { resume: { id } } });
  }

  async remove(id: number): Promise<void> {
    await this.ProjectRepository.delete(id);
  }
}