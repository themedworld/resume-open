// src/message/entities/message.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne,CreateDateColumn,Timestamp } from 'typeorm';
import { UserEntity } from 'src/users/entities/user.entity';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  Message: string;

  @ManyToOne(() => UserEntity, user => user.sentMessages)
  sender: UserEntity;

  @ManyToOne(() => UserEntity, user => user.receivedMessages)
  receiver: UserEntity;
  @CreateDateColumn()
  createdAt:Timestamp;
}
