// src/message/message.controller.ts
import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './entities/message.entity';
import { UserEntity } from 'src/users/entities/user.entity';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post('createmessage')
  async create(@Body() createMessageDto: CreateMessageDto): Promise<{ message: Message }> {
    const message = await this.messageService.create(createMessageDto);
    return { message };
  }

  @Get()
  findAll() {
    return this.messageService.findAll();
  }



  @Get('between/:senderId/:receiverId')
  async findBySenderAndReceiver(@Param('senderId') senderId: string, @Param('receiverId') receiverId: string) {
    const result1 = await this.messageService.findBySenderAndReceiver(+senderId, +receiverId);
    const result2 = await this.messageService.findBySenderAndReceiver(+receiverId, +senderId);
  
    // Combiner les deux ensembles de messages en un seul tableau
    const allMessages = [...result1.messages, ...result2.messages];
  
    return { messages: allMessages };
  }
  

  @Get('contacts/:senderId')
  async findContact(@Param('senderId') senderId: string): Promise<{ receivers: UserEntity[] }> {
    const receivers = await this.messageService.findContact(+senderId);
    return { receivers };
  }

  @Get('contactsdem/:receiverId')
  async findContactdem(@Param('receiverId') receiverId: string): Promise<{ senders: UserEntity[] }> {
    const senders = await this.messageService.findContactDem(+receiverId);
    return { senders };
  }
  
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.messageService.remove(+id);
  }
}
