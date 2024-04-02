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


  async createProject(createProjectDtoArray: CreateProjectDto[]): Promise<Project[]> {
    const createdProjects: Project[] = [];
    for (const createProjectDto of createProjectDtoArray) {
      const { resumeid, ...rest } = createProjectDto;
      const resume = await this.ResumeRepository.findOne({ where: { id: resumeid } });
      if (!resume) {
        throw new NotFoundException('Resume not found');
      }
      const project = this.ProjectRepository.create({ ...rest, resume });
      createdProjects.push(await this.ProjectRepository.save(project));
    }
    return createdProjects;
  }


  async updateProject(id: number, updateProjectDto: UpdateProjectDto): Promise<Project> {
    const project = await this.ProjectRepository.findOne({ where: { id } });
    if (!project) {
      throw new NotFoundException(`Project with id ${id} not found`);
    }
    project.project = updateProjectDto.project;
    project.date = updateProjectDto.date;
    project.descriptions = updateProjectDto.descriptions;
    return this.ProjectRepository.save(project);
  }
  async findProjectByResumeId(id: number): Promise<Project[]> {
    return this.ProjectRepository.find({ where: { resume: { id } } });
  }

  async remove(id: number): Promise<void> {
    await this.ProjectRepository.delete(id);
  }
}