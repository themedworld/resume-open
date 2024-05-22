// src/message/message.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from 'src/message/entities/message.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async create(createMessageDto: CreateMessageDto): Promise<Message> {
    const sender = await this.userRepository.findOne({ where: { id: createMessageDto.sender } });
    if (!sender) {
      throw new NotFoundException('Sender not found');
    }

    const receiver = await this.userRepository.findOne({ where: { id: createMessageDto.receiver } });
    if (!receiver) {
      throw new NotFoundException('Receiver not found');
    }

    const message = this.messageRepository.create({
      Message: createMessageDto.Message,
      sender,
      receiver,
    });

    return this.messageRepository.save(message);
  }

  findAll(): Promise<Message[]> {
    return this.messageRepository.find({ relations: ['sender', 'receiver'] });
  }




async findBySenderAndReceiver(senderId: number, receiverId: number): Promise<{ messages: { senderId: number, receiverId: number, message: Message }[] }> {
  const messages = await this.messageRepository.find({
    where: { sender: { id: senderId }, receiver: { id: receiverId } },
  });

  const enrichedMessages = messages.map(message => ({
    senderId,
    receiverId,
    message,
  }));

  return {
    messages: enrichedMessages,
  };
}

  async findContact(senderId: number): Promise<UserEntity[]> {
    const query = this.messageRepository
      .createQueryBuilder('message')
      .distinctOn(['message.receiver'])
      .innerJoinAndSelect('message.receiver', 'receiver')
      .where('message.senderId = :senderId', { senderId })
      .orderBy('message.receiverId')
      .getMany();

    const messages = await query;

    return messages.map(message => message.receiver);
  }


async findContactDem(receiverId: number): Promise<UserEntity[]> {
  const messages = await this.messageRepository
    .createQueryBuilder('message')
    .distinctOn(['message.senderId'])
    .innerJoinAndSelect('message.sender', 'sender')
    .where('message.receiverId = :receiverId', { receiverId })
    .orderBy('message.senderId') // must match the distinctOn column
    .addOrderBy('message.createdAt', 'DESC') // additional sorting to get the latest messages
    .getMany();

  return messages.map(message => message.sender);
}



  async remove(id: number): Promise<void> {
    await this.messageRepository.delete(id);
  }
}
