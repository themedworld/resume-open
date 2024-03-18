import { ResSet } from 'src/Resume-Setting/entities/res-set.entity';
import { Module } from '@nestjs/common';
import { ResSetService } from './res-set.service';
import { ResSetController } from './res-set.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResumeModule } from 'src/resume/resume.module';
@Module({
  imports: [
    
    TypeOrmModule.forFeature([ResSet]),ResumeModule
  ],
  controllers: [ResSetController],
  providers: [ResSetService],
})
export class ResSetModule {}
