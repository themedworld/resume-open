import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { Resume } from 'src/resume/entities/resume.entity';
@Entity()
export class Resumeimage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fileName: string;
  @Column()
  documentSize: string;
  @Column({ type:"text" })
  document: string;
  

  @OneToOne(() => Resume, (resume) => resume.Resumeimage, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'resumeid' })
  resume: Resume;
}
