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
  async findWorkExpByResumeId(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ workexp: WorkExp[]; count: number }> {
    const workexp = await this.workExpService.findResSetByResumeId(id);
    const count = workexp.length;
    return { workexp, count };
  }
  @Put(':id')
  async updateWorkExp(@Param('id') id: number, @Body() updateWorkExpDto: UpdateWorkExpDto): Promise<WorkExp> {
    return this.workExpService.updateWorkExp(id, updateWorkExpDto);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workExpService.remove(+id);
  }
 
}
