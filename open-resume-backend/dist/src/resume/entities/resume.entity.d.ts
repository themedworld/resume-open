import { UserEntity } from 'src/users/entities/user.entity';
import { PerInf } from 'src/Personal-information/entities/per-inf.entity';
import { Education } from 'src/education/entities/education.entity';
import { Project } from 'src/project/entities/project.entity';
import { WorkExp } from 'src/work-experience/entities/work-exp.entity';
import { Skills } from 'src/skills/entities/skill.entity';
import { ResSet } from 'src/Resume-Setting/entities/res-set.entity';
import { CusSec } from 'src/Custumer-serction/entities/cus-sec.entity';
import { Language } from 'src/language/entities/language.entity';
export declare class Resume {
    id: number;
    user: UserEntity;
    name: string;
    perInf: PerInf;
    Education: Education[];
    projects: Project[];
    workExp: WorkExp[];
    skills: Skills[];
    resSet: ResSet;
    CusSec: CusSec;
    Language: Language[];
}
