import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
    OneToOne,
    JoinColumn,
  } from 'typeorm';
  import { UserEntity } from 'src/users/entities/user.entity';
  import { PerInf } from 'src/Personal-information/entities/per-inf.entity';
  import { Education } from 'src/education/entities/education.entity';
  import { Project } from 'src/project/entities/project.entity';
  import { WorkExp } from 'src/work-experience/entities/work-exp.entity';
  import { Skills } from 'src/skills/entities/skill.entity';
  import { ResSet } from 'src/Resume-Setting/entities/res-set.entity';
  import { CusSec } from 'src/Custumer-serction/entities/cus-sec.entity';
  import { Language } from 'src/language/entities/language.entity';
  
  @Entity()
  export class Resume {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => UserEntity, (User) => User.resume)
    @JoinColumn({ name: 'iduser' })
    user: UserEntity;
    
    @Column()
    name:string;
  
    @OneToOne(() => PerInf, (perInf) => perInf.resume)
    perInf: PerInf;
  
    @OneToMany(() => Education, (Education) => Education.resume)
    Education: Education[];
  
    @OneToMany(() => Project, (project) => project.resume)
    projects: Project[];
  
    @OneToMany(() => WorkExp, (workExp) => workExp.resume)
    workExp: WorkExp[];
  
    @OneToMany(() => Skills, (skills) => skills.resume)
    skills: Skills[];
  
    @OneToOne(() => ResSet, (resSet) => resSet.resume)
    resSet: ResSet;
  
    @OneToOne(() => CusSec, (CusSec) => CusSec.resume)
    CusSec: CusSec;
  
    @OneToMany(() => Language, (Language) => Language.resume)
    Language: Language[];
  }