import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { JoinColumn } from 'typeorm';
import { Resume } from 'src/resume/entities/resume.entity';

@Entity()
export class Education {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  school: string;

  @Column({ type: 'date' })
  date: Date;

  @Column()
  degree: string;

  @Column()
  gpa: string;

  @Column()
  additionalInformation: string;

  @ManyToOne(() => Resume, (resume) => resume.Education, { onDelete:'CASCADE' })
  @JoinColumn({ name: 'resumeid' })
  resume: Resume;
}
