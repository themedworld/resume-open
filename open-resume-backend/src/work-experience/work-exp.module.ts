import { WorkExp } from 'src/work-experience/entities/work-exp.entity';
import { Module } from '@nestjs/common';
import { WorkExpService } from './work-exp.service';
import { WorkExpController } from './work-exp.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResumeModule } from 'src/resume/resume.module';

@Module({
  imports: [
    
    TypeOrmModule.forFeature([WorkExp]),ResumeModule,
  ],
  controllers: [WorkExpController],
  providers: [WorkExpService],
})
export class WorkExpModule {}
