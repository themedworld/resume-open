import { Timestamp } from 'typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
export declare class Message {
    id: number;
    Message: string;
    sender: UserEntity;
    receiver: UserEntity;
    createdAt: Timestamp;
}
