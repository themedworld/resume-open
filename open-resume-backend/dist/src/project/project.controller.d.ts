import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { Project } from './entities/project.entity';
import { UpdateProjectDto } from './dto/update-project.dto';
export declare class ProjectController {
    private readonly projectService;
    constructor(projectService: ProjectService);
    createProject(createProjectDtoArray: CreateProjectDto[]): Promise<Project[]>;
    updateProject(id: number, updateProjectDto: UpdateProjectDto): Promise<Project>;
    findProjectByResumeId(id: number): Promise<{
        projects: Project[];
        count: number;
    }>;
    remove(id: string): Promise<void>;
}
