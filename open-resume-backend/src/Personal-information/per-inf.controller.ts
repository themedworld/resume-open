import { Controller, Get, Post, Body, Patch, Param, Delete, Put, ParseIntPipe ,Headers} from '@nestjs/common';
import { PerInfService } from './per-inf.service';
import { CreatePerInfDto } from './dto/create-per-inf.dto';
import { PerInf } from './entities/per-inf.entity';
import { UpdatePerInfDto } from './dto/update-per-inf.dto';
@Controller('per-inf')
export class PerInfController {
  constructor(private readonly perInfService: PerInfService) {}
  @Post('createPerInf')
  async craetePerInf(@Body() createPerInfDto: CreatePerInfDto): Promise<{perinf: PerInf }> {
    const perinf = await this.perInfService.createPerInf(createPerInfDto);
    return { perinf };
  }
  @Put(':id')
  async updatePerInf(@Param('id') id: number, @Body() updatePerInfDto: UpdatePerInfDto): Promise<PerInf> {
    return this.perInfService.updatePerInf(id, updatePerInfDto);
  }
  @Get(':id')
  async findPerInfByResumeId(@Param('id') id) {
    return this.perInfService.findPerInfByResumeId(parseInt(id));
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.perInfService.remove(+id);
  }
}
