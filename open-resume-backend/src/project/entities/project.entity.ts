import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Resume } from 'src/resume/entities/resume.entity';
@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  projectName: string; // Utilisez la convention de nommage camelCase

  @Column({ type: 'date' })
  date: Date; // Renommez "Dte" en "date" pour plus de clarté

  @Column()
  description: string; // Utilisez la convention de nommage camelCase


  @ManyToOne(() => Resume, (resume) => resume.projects, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'resumeid' })
  resume: Resume;
}
