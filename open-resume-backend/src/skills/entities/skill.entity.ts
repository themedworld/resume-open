import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Resume } from 'src/resume/entities/resume.entity'

@Entity()
export class Skills {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  skill: string;

  @Column()
  featuredSkill: number;

  @ManyToOne(() => Resume, (resume) => resume.skills, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'resumeid' })
  resume: Resume;
}
