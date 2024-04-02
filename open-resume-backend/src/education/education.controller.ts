import { Controller, Get, Post, Body, Patch, Param, Delete,Put, ParseIntPipe } from '@nestjs/common';
import { EducationService } from './education.service';
import { CreateEducationDto } from './dto/create-education.dto';
import { Education } from './entities/education.entity';
import { UpdateEducationDto } from './dto/update-education.dto';
@Controller('education')
export class EducationController {
  constructor(private readonly educationService: EducationService) {}

  @Post()
  async createEducation(@Body() createEducationDtoArray: CreateEducationDto[]): Promise<Education[]> {
    return this.educationService.createEducation(createEducationDtoArray);
  }
  @Put(':id')
  async updateEducation(@Param('id') id: number, @Body() updateEducationDto: UpdateEducationDto): Promise<Education> {
    return this.educationService.updateEducation(id, updateEducationDto);
  }
  @Get(':id')
  async findEducationByResumeId(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ educations: Education[]; count: number }> {
    const educations = await this.educationService.findEducationByResumeId(id);
    const count = educations.length;
    return { educations, count };
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.educationService.remove(+id);
  }
}
