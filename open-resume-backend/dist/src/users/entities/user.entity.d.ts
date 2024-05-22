import { Timestamp } from 'typeorm';
import { Resume } from 'src/resume/entities/resume.entity';
import { Message } from 'src/message/entities/message.entity';
export declare enum UserRole {
    Recruteur = "recruteur",
    Demandeur = "demandeur"
}
export declare class UserEntity {
    id: number;
    username: string;
    email: string;
    password: string;
    name: string;
    numtel: string;
    companyname: string;
    adresse: string;
    role: UserRole;
    determineUserRole(): UserRole;
    createdAt: Timestamp;
    updateAt: Timestamp;
    resume: Resume[];
    sentMessages: Message[];
    receivedMessages: Message[];
}
