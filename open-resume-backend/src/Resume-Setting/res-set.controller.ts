import { Controller, Get, Post, Body, Patch, Param, Delete, Put, ParseIntPipe } from '@nestjs/common';
import { ResSetService } from './res-set.service';
import { CreateResSetDto } from './dto/create-res-set.dto';
import { UpdateResSetDto } from './dto/update-res-set.dto';
import { ResSet } from './entities/res-set.entity';
@Controller('res-set')
export class ResSetController {
  constructor(private readonly resSetService: ResSetService) {}

  @Post('createSkills')
  async craeteResSet(@Body() createResSetDto: CreateResSetDto): Promise<{resset: ResSet }> {
    const resset = await this.resSetService.createResSet(createResSetDto);
    return { resset };
  }
  @Put(':id')
  async updateResSet(@Param('id') id: number, @Body() updateResSetDto: UpdateResSetDto): Promise<ResSet> {
    return this.resSetService.updateResSet(id, updateResSetDto);
  }

  @Get(':id')
  async findResSetByResumeId(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ ressets: ResSet[]; count: number }> {
    const ressets = await this.resSetService.findResSetByResumeId(id);
    const count = ressets.length;
    return { ressets, count };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.resSetService.remove(+id);
  }
}
