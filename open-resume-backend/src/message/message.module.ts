import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { Message } from './entities/message.entity';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({

  imports: [
    
    TypeOrmModule.forFeature([Message]),UsersModule,
  ],
  controllers: [MessageController],
  providers: [MessageService],
})
export class MessageModule {}
