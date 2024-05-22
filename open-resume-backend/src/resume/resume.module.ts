import { Module } from '@nestjs/common';
import { ResumeService } from './resume.service';
import { ResumeController } from './resume.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Resume } from './entities/resume.entity';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { LanguageService } from 'src/language/language.service';
import { PerInfService } from 'src/Personal-information/per-inf.service';
import { ProjectService } from 'src/project/project.service';
import { SkillsService } from 'src/skills/skills.service';
import { WorkExpService } from 'src/work-experience/work-exp.service';
import { CusSecService } from 'src/Custumer-serction/cus-sec.service';
import { Language } from 'src/language/entities/language.entity';
import { PerInf } from 'src/Personal-information/entities/per-inf.entity';
import { CusSec } from 'src/Custumer-serction/entities/cus-sec.entity';
import { ResSetService } from 'src/Resume-Setting/res-set.service';
import { ResSet } from 'src/Resume-Setting/entities/res-set.entity';
import { WorkExp } from 'src/work-experience/entities/work-exp.entity';
import { Project } from 'src/project/entities/project.entity';
import { Skills } from 'src/skills/entities/skill.entity';
import { Education } from 'src/education/entities/education.entity';
import { EducationService } from 'src/education/education.service';
import { UploadedFileService } from 'src/photo/photo.service';
import { Photo } from 'src/photo/entities/photo.entity';
import { Resumeimage } from 'src/resumeimage/entities/resumeimage.entity';
import { ResumeimageService } from 'src/resumeimage/resumeimage.service';
@Module({
  imports: [
    
    TypeOrmModule.forFeature([Resume, Language, PerInf, CusSec,ResSet,WorkExp,Project,Skills,Education,Photo,Resumeimage ]), UsersModule,
  ], 
  controllers: [ResumeController],
  providers: [ResumeService, UsersService,ResSetService, LanguageService, PerInfService, ProjectService, ProjectService, SkillsService, WorkExpService, CusSecService,EducationService,UploadedFileService , ResumeimageService],
  exports: [TypeOrmModule],
})
export class ResumeModule {}
