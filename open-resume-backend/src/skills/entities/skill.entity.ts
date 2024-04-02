import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Resume } from 'src/resume/entities/resume.entity';

@Entity()
export class Skills {
  @PrimaryGeneratedColumn()
  id: number;


  @Column('jsonb')
  featuredSkills: { skill: string; rating: number }[];

  @Column('text', { array: true })
  descriptions: string[];

  @ManyToOne(() => Resume, (resume) => resume.skills, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'resumeid' })
  resume: Resume;
}
