import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Resume } from 'src/resume/entities/resume.entity';

@Entity()
export class Language {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  language: string; // Utilisez la convention de nommage camelCase

  @Column('text', { array: true })
  descriptions: string[]; // Modifiez "degree" en "proficiency" pour plus de clarté

  @ManyToOne(() => Resume, (resume) => resume.Language, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'resumeid' })
  resume: Resume;
}
