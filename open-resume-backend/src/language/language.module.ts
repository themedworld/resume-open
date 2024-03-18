import { Language } from 'src/language/entities/language.entity';
import { Module } from '@nestjs/common';
import { LanguageService } from './language.service';
import { LanguageController } from './language.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResumeModule } from 'src/resume/resume.module';

@Module({
  imports: [
    
    TypeOrmModule.forFeature([Language]),ResumeModule,
  ],
  controllers: [LanguageController],
  providers: [LanguageService],
})
export class LanguageModule {}
