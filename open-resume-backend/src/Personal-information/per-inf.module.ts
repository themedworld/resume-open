/* eslint-disable prettier/prettier */
import { PerInf } from 'src/Personal-information/entities/per-inf.entity';
import { Module } from '@nestjs/common';
import { PerInfService } from './per-inf.service';
import { PerInfController } from './per-inf.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResumeModule } from 'src/resume/resume.module';

@Module({
  imports: [
    
    TypeOrmModule.forFeature([PerInf]),ResumeModule,
  ],
  controllers: [PerInfController],
  providers: [PerInfService],
})
export class PerInfModule {}
