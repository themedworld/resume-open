import { Repository } from 'typeorm';
import { Message } from 'src/message/entities/message.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { CreateMessageDto } from './dto/create-message.dto';
export declare class MessageService {
    private messageRepository;
    private userRepository;
    constructor(messageRepository: Repository<Message>, userRepository: Repository<UserEntity>);
    create(createMessageDto: CreateMessageDto): Promise<Message>;
    findAll(): Promise<Message[]>;
    findBySenderAndReceiver(senderId: number, receiverId: number): Promise<{
        messages: {
            senderId: number;
            receiverId: number;
            message: Message;
        }[];
    }>;
    findContact(senderId: number): Promise<UserEntity[]>;
    findContactDem(receiverId: number): Promise<UserEntity[]>;
    remove(id: number): Promise<void>;
}
