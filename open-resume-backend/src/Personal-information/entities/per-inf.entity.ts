import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Resume } from 'src/resume/entities/resume.entity';
@Entity()
export class PerInf {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  objective: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  website: string;

  @Column()
  location: string;
 

  @OneToOne(() => Resume, (resume) => resume.perInf, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'resumeid' })
  resume: Resume;
}
