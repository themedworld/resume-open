
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { JoinColumn } from 'typeorm';
import { Resume } from 'src/resume/entities/resume.entity';

@Entity()
export class CusSec {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', { array: true })
  descriptions: string[];

  @ManyToOne(() => Resume, (resume) => resume.CusSec, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'resumeid' })
  resume: Resume;

}