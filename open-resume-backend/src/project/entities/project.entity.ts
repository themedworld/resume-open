import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Resume } from 'src/resume/entities/resume.entity';
@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  project: string; // Utilisez la convention de nommage camelCase

  @Column()
  date: string; // Renommez "Dte" en "date" pour plus de clarté

  @Column()
  descriptions: string; // Utilisez la convention de nommage camelCase


  @ManyToOne(() => Resume, (resume) => resume.projects, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'resumeid' })
  resume: Resume;
}
