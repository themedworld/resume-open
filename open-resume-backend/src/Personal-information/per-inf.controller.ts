/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, Put, ParseIntPipe, Headers } from '@nestjs/common';
import { PerInfService } from './per-inf.service';
import { CreatePerInfDto } from './dto/create-per-inf.dto';
import { PerInf } from './entities/per-inf.entity';
import { UpdatePerInfDto } from './dto/update-per-inf.dto';

@Controller('per-inf')
export class PerInfController {
  constructor(private readonly perInfService: PerInfService) {}

  @Post('createPerInf')
  async createPerInf(@Body() createPerInfDto: CreatePerInfDto): Promise<{ perInf: PerInf }> {
    const perInf = await this.perInfService.createPerInf(createPerInfDto);
    return { perInf };
  }

  @Put(':id')
  async updatePerInf(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePerInfDto: UpdatePerInfDto,
  ): Promise<PerInf> {
    return this.perInfService.updatePerInf(id, updatePerInfDto);
  }

  @Get(':id')
  async findPerInfByResumeId(@Param('id', ParseIntPipe) id: number): Promise<PerInf> {
    return this.perInfService.findPerInfByResumeId(id);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.perInfService.remove(id);
  }

  @Get('findlocation/:location')
  async findLocation(
    @Param('location') location: string,
  ): Promise<{ perInf: { id: number, resumeid: number, name: string, summary: string, email: string, phone: string, location: string, url: string }[] }> {
    const perInf = await this.perInfService.findLocation(location);
    return { perInf };
  }
}

