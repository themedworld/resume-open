import { Controller, Get, Post, Body, Patch, Param, Delete, Put, ParseIntPipe } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { Project } from './entities/project.entity';
import { UpdateProjectDto } from './dto/update-project.dto';
@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}
  @Post()
  async createProject(@Body() createProjectDtoArray: CreateProjectDto[]): Promise<Project[]> {
    return this.projectService.createProject(createProjectDtoArray);
  }
  @Put(':id')
  async updateProject(@Param('id') id: number, @Body() updateProjectDto: UpdateProjectDto): Promise<Project> {
    return this.projectService.updateProject(id, updateProjectDto);
  }

  @Get(':id')
  async findProjectByResumeId(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ projects: Project[]; count: number }> {
    const projects = await this.projectService.findProjectByResumeId(id);
    const count = projects.length;
    return { projects, count };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectService.remove(+id);
  }
}
