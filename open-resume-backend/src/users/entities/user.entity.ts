import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn , Timestamp } from 'typeorm';

export enum UserRole {
    Recruteur = 'recruteur',
    Demandeur = 'demandeur',
}

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique:true})
    username: string;

    @Column({unique:true})
    email: string;

    @Column({select:false})
    password: string;

    @Column({ nullable: true })
    name: string;

    @Column({ nullable: true })
    numtel: string;

    @Column({ nullable: true })
    companyname: string;

    @Column({ nullable: true })
    adresse: string;

    @Column({
        type: 'enum',
        enum: UserRole,
        nullable: false,
    })
    role: UserRole;

    determineUserRole(): UserRole {
        if ((!this.name || !this.numtel)) {
            return UserRole.Recruteur;
        } else {
            return UserRole.Demandeur;
        }
    }
    @CreateDateColumn()
    createdAt:Timestamp;
    @UpdateDateColumn()
    updateAt:Timestamp;
}




