import { Controller, Get, Post, Body, Patch, Param, Delete, Put, ParseIntPipe } from '@nestjs/common';
import { ResumeService } from './resume.service';
import { CreateResumeDto } from './dto/create-resume.dto';
import { Resume } from './entities/resume.entity';
import { UpdateResumeNameDto } from './dto/update-resumename.dto';
@Controller('resume')
export class ResumeController {
  constructor(private readonly resumeService: ResumeService) {}
  @Post('createresume')
  async createresume(@Body() createResumeDto: CreateResumeDto): Promise<{resume: Resume }> {
    const resume = await this.resumeService.createResume(createResumeDto);
    return { resume };


  } 
  @Get(':id')
  async findResumeByUserId(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ resumes: Resume[]; count: number }> {
    const resumes = await this.resumeService.findResumeByUserId(id);
    const count = resumes.length;
    return { resumes, count };
  }

  @Get('resume/:id')
  findOne(@Param('id') id: string) {
    return this.resumeService.findOne(+id);
  }
  @Put(':id/name')
  async updateName(@Param('id') id: number, @Body() updateResumeNameDto: UpdateResumeNameDto): Promise<Resume> {
    return this.resumeService.updateName(id, updateResumeNameDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.resumeService.remove(+id);
  }

}
