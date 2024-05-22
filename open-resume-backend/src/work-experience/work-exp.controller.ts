import { Controller, Get, Post, Body, Patch, Param, Delete, Put, ParseIntPipe } from '@nestjs/common';
import { WorkExpService } from './work-exp.service';
import { CreateWorkExpDto } from './dto/create-work-exp.dto';
import { WorkExp } from './entities/work-exp.entity';
import { UpdateWorkExpDto } from './dto/update-work-exp.tdo';

@Controller('work-exp')
export class WorkExpController {
  constructor(private readonly workExpService: WorkExpService) {}

  @Post()
  async createWorkExp(@Body() createWorkExpDtoArray: CreateWorkExpDto[]): Promise<WorkExp[]> {
    return this.workExpService.createWorkExp(createWorkExpDtoArray);
  }

  @Get(':id')
  async findWorkExpByResumeId(@Param('id', ParseIntPipe) id: number): Promise<{ workexp: WorkExp[]; count: number }> {
    const workexp = await this.workExpService.findWorkExpByResumeId(id);
    const count = workexp.length;
    return { workexp, count };
  }

  @Put(':id')
  async updateWorkExp(@Param('id') id: number, @Body() updateWorkExpDto: UpdateWorkExpDto): Promise<WorkExp> {
    return this.workExpService.updateWorkExp(id, updateWorkExpDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.workExpService.remove(+id);
  }

  @Get('findjobTitle/:jobTitle')
  async findjobTitle(
    @Param('jobTitle') jobTitle: string,
  ): Promise<{ workExp: { id: number, resumeid: number,company:string, jobTitle: string, date:string , description: string }[] }> {
    const workExp = await this.workExpService.findjobtitle(jobTitle);
    return { workExp};
  }
}