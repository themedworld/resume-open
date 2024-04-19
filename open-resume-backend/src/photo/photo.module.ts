import { Module } from '@nestjs/common';
import { UploadedFileService } from './photo.service';
import { UploadedFileController } from './photo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Photo } from './entities/photo.entity';
import { ResumeModule } from 'src/resume/resume.module';
@Module({
  imports: [
    
    TypeOrmModule.forFeature([Photo]),ResumeModule,
  ],
  controllers: [UploadedFileController],
  providers: [UploadedFileService ],
})
export class PhotoModule {}

