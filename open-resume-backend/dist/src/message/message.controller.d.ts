import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './entities/message.entity';
import { UserEntity } from 'src/users/entities/user.entity';
export declare class MessageController {
    private readonly messageService;
    constructor(messageService: MessageService);
    create(createMessageDto: CreateMessageDto): Promise<{
        message: Message;
    }>;
    findAll(): Promise<Message[]>;
    findBySenderAndReceiver(senderId: string, receiverId: string): Promise<{
        messages: {
            senderId: number;
            receiverId: number;
            message: Message;
        }[];
    }>;
    findContact(senderId: string): Promise<{
        receivers: UserEntity[];
    }>;
    findContactdem(receiverId: string): Promise<{
        senders: UserEntity[];
    }>;
    remove(id: string): Promise<void>;
}
