import { Timestamp } from 'typeorm';
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
}
