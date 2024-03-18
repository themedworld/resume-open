import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Resume } from 'src/resume/entities/resume.entity'; // Assurez-vous que le nom de la classe est correctement importé

@Entity()
export class WorkExp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  companyName: string;

  @Column()
  jobTitle: string;

  @Column({ type: 'date' })
  date: Date;

  @Column()
  description: string;


  @ManyToOne(() => Resume, (resume) => resume.workExp, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'resumeid' })
  resume: Resume;
}
