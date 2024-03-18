import { Project } from 'src/project/entities/project.entity';
import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResumeModule } from 'src/resume/resume.module';
@Module({
  imports: [
    
    TypeOrmModule.forFeature([Project]),ResumeModule,
  ],
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class ProjectModule {}
