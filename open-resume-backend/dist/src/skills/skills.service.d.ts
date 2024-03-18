import { CreateSkillsDto } from './dto/create-skill.dto';
import { Skills } from './entities/skill.entity';
import { Repository } from 'typeorm';
import { Resume } from 'src/resume/entities/resume.entity';
import { UpdateSkillsDto } from './dto/update-skills.dto';
export declare class SkillsService {
    private SkillsRepository;
    private ResumeRepository;
    constructor(SkillsRepository: Repository<Skills>, ResumeRepository: Repository<Resume>);
    createSkills(createSkillsDto: CreateSkillsDto): Promise<Skills>;
    updateSkills(id: number, updateSkillsDto: UpdateSkillsDto): Promise<Skills>;
    findSkillsByResumeId(id: number): Promise<Skills[]>;
    remove(id: number): Promise<void>;
}
