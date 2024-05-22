import { Module } from '@nestjs/common';
import { ResumeimageService } from './resumeimage.service';
import { ResumeimageController } from './resumeimage.controller';
import { Resumeimage } from './entities/resumeimage.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResumeModule } from 'src/resume/resume.module';
@Module({

  imports: [
    
    TypeOrmModule.forFeature([Resumeimage]),ResumeModule,
  ],
  controllers: [ResumeimageController],
  providers: [ResumeimageService],
})
export class ResumeimageModule {}
