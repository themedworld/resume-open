import { Controller, Get, Post, Body, Patch, Param, Delete, Put, ParseIntPipe } from '@nestjs/common';
import { CusSecService } from './cus-sec.service';
import { CreateCusSecDto } from './dto/create-cus-sec.dto';
import { CusSec } from './entities/cus-sec.entity';
import { UpdateCusSecDto } from './dto/update-cussec.dto';
@Controller('cus-sec')
export class CusSecController {
  constructor(private readonly cusSecService: CusSecService) {}
  @Post('create-cus-sec')
  async createCusSec(@Body() createCusSecDto: CreateCusSecDto): Promise<{cussec: CusSec }> {
    const cussec = await this.cusSecService.createCusSec(createCusSecDto);
    return { cussec };
  }

  @Put(':id')
  async updateCusSec(@Param('id') id: number, @Body() updateCusSecDto: UpdateCusSecDto): Promise<CusSec> {
    return this.cusSecService.updateCusSec(id, updateCusSecDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cusSecService.remove(+id);
  }
  @Get(':id')
  async findCusSecByResumeId(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ cusSecs: CusSec[]; count: number }> {
    const cusSecs = await this.cusSecService.findCusSecByResumeId(id);
    const count = cusSecs.length;
    return { cusSecs, count };
  }
}
