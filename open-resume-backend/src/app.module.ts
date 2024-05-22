import {MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import{TypeOrmModule} from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/data-source';
import { UsersModule } from './users/users.module';
import { CurrentUserMiddleware } from './utility/middlewares/current-user.middleware';
import { ResumeModule } from './resume/resume.module';
import { PerInfModule } from './Personal-information/per-inf.module';
import { CusSecModule } from './Custumer-serction/cus-sec.module';
import { EducationModule } from './education/education.module';
import { LanguageModule } from './language/language.module';
import { ProjectModule } from './project/project.module';
import { ResSetModule } from './Resume-Setting/res-set.module';
import { SkillsModule } from './skills/skills.module';
import { WorkExpModule } from './work-experience/work-exp.module';
import { PhotoModule } from './photo/photo.module';
import { MessageModule } from './message/message.module';
import { ResumeimageModule } from './resumeimage/resumeimage.module';



@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), UsersModule, ResumeModule, PerInfModule, CusSecModule, EducationModule, LanguageModule, ProjectModule, ResSetModule, SkillsModule, WorkExpModule, PhotoModule, MessageModule, ResumeimageModule],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CurrentUserMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}

