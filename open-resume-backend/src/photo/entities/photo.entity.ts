import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { Resume } from 'src/resume/entities/resume.entity';
@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name:string;
  @Column()
  size:string;
  @Column({ type: "text" })
  fileUrl:string;
  

  @OneToOne(() => Resume, (resume) => resume.Photo, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'resumeid' })
  resume: Resume;
}
