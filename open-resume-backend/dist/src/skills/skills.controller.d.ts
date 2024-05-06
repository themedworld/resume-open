import { SkillsService } from './skills.service';
import { CreateSkillsDto } from './dto/create-skill.dto';
import { Skills } from './entities/skill.entity';
import { UpdateSkillsDto } from './dto/update-skills.dto';
import { FeaturedSkillDto } from './dto/create-skill.dto';
export declare class SkillsController {
    private readonly skillsService;
    constructor(skillsService: SkillsService);
    craeteSkills(createSkillsDto: CreateSkillsDto): Promise<{
        skills: Skills;
    }>;
    findSkillsByResumeId(id: number): Promise<{
        skills: Skills[];
        count: number;
    }>;
    updateSkills(id: number, updateSkillsDto: UpdateSkillsDto): Promise<Skills>;
    remove(id: string): Promise<void>;
    findSkill(skill: string): Promise<{
        id: number;
        resumeid: number;
        FeaturedSkills: FeaturedSkillDto[];
        descriptions: string;
    }[]>;
}
