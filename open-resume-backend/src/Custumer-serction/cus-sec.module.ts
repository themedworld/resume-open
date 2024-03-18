import { CusSec } from 'src/Custumer-serction/entities/cus-sec.entity';
import { Module } from '@nestjs/common';
import { CusSecService } from './cus-sec.service';
import { CusSecController } from './cus-sec.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResumeModule } from 'src/resume/resume.module';

@Module({
  imports: [
    
    TypeOrmModule.forFeature([CusSec]), ResumeModule
  ],
  controllers: [CusSecController],
  providers: [CusSecService],
})
export class CusSecModule {}
