import { CreateProjectDto } from './dto/create-project.dto';
import { Project } from './entities/project.entity';
import { Repository } from 'typeorm';
import { Resume } from 'src/resume/entities/resume.entity';
import { UpdateProjectDto } from './dto/update-project.dto';
export declare class ProjectService {
    private ProjectRepository;
    private ResumeRepository;
    constructor(ProjectRepository: Repository<Project>, ResumeRepository: Repository<Resume>);
    createProject(createProjectDtoArray: CreateProjectDto[]): Promise<Project[]>;
    updateProject(id: number, updateProjectDto: UpdateProjectDto): Promise<Project>;
    findProjectByResumeId(id: number): Promise<Project[]>;
    remove(id: number): Promise<void>;
}
