import { Module } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { SkillsController } from './skills.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Skills } from './entities/skill.entity';
import { ResumeModule } from 'src/resume/resume.module';
@Module({
  imports: [
    
    TypeOrmModule.forFeature([Skills]), ResumeModule,
  ],
  controllers: [SkillsController],
  providers: [SkillsService],
})
export class SkillsModule {}

