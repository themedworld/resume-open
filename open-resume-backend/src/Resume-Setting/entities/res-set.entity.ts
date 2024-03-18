import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Resume } from 'src/resume/entities/resume.entity';
@Entity()
export class ResSet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  themeColor: string; // Utilisez la convention de nommage camelCase

  @Column()
  fontSize: string; // Utilisez la convention de nommage camelCase

  @Column()
  documentSize: string;


  @OneToOne(() => Resume, (resume) => resume.resSet, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'resumeid' })
  resume: Resume;
}
