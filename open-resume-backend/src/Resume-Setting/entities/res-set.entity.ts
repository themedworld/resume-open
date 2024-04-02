import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Resume } from 'src/resume/entities/resume.entity';
@Entity()
export class ResSet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  themeColor: string;

  @Column()
  fontFamily: string;

  @Column()
  documentSize: string;

  @Column()
  fontSize: string; 

  @OneToOne(() => Resume, (resume) => resume.resSet, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'resumeid' })
  resume: Resume;
}
