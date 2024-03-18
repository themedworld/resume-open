import { Education } from 'src/education/entities/education.entity';
import { Module } from '@nestjs/common';
import { EducationService } from './education.service';
import { EducationController } from './education.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResumeModule } from 'src/resume/resume.module';
@Module({
  imports: [
    
    TypeOrmModule.forFeature([Education]),ResumeModule,
  ],
  controllers: [EducationController],
  providers: [EducationService],
})
export class EducationModule {}
