import { Module } from '@nestjs/common';
import { ResumeService } from './resume.service';
import { ResumeController } from './resume.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Resume } from './entities/resume.entity';
import { UsersModule } from 'src/users/users.module';
@Module({
  imports: [
    
    TypeOrmModule.forFeature([Resume]), UsersModule,
  ], 
  controllers: [ResumeController],
  providers: [ResumeService],
  exports: [TypeOrmModule],
})
export class ResumeModule {}
