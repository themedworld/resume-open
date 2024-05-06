import { Controller, Get, Post, Body, Patch, Param, Delete, Put, ParseIntPipe } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { CreateSkillsDto } from './dto/create-skill.dto';
import { Skills } from './entities/skill.entity';
import { UpdateSkillsDto } from './dto/update-skills.dto';
import { FeaturedSkillDto } from './dto/create-skill.dto';
@Controller('skills')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @Post('createSkills')
  async craeteSkills(@Body() createSkillsDto: CreateSkillsDto): Promise<{skills: Skills }> {
    const skills = await this.skillsService.createSkills(createSkillsDto);
    return { skills };
  }
  @Get(':id')
  async findSkillsByResumeId(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ skills: Skills[]; count: number }> {
    const skills = await this.skillsService.findSkillsByResumeId(id);
    const count = skills.length;
    return { skills, count };
  }
  @Put(':id')
  async updateSkills(@Param('id') id: number, @Body() updateSkillsDto: UpdateSkillsDto): Promise<Skills> {
    return this.skillsService.updateSkills(id, updateSkillsDto);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.skillsService.remove(+id);
  }
  @Get('findSkill/:skill')
  async findSkill(@Param('skill') skill: string): Promise<{ id: number, resumeid: number, FeaturedSkills: FeaturedSkillDto[], descriptions: string }[]> {
    const skills = await this.skillsService.findSkill(skill);
    return skills;
  }

}
