import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSkillsDto } from './dto/create-skill.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Skills } from './entities/skill.entity';
import { Repository } from 'typeorm';
import { Resume } from 'src/resume/entities/resume.entity';
import { UpdateSkillsDto, FeaturedSkillDto } from './dto/update-skills.dto';
@Injectable()
export class SkillsService {

  constructor(
    @InjectRepository(Skills)
    private SkillsRepository: Repository<Skills>,
    @InjectRepository(Resume)
    private ResumeRepository: Repository<Resume>,
  ) {}


  async createSkills(createSkillsDto: CreateSkillsDto): Promise<Skills> {
    const resume = await this.ResumeRepository.findOne({ where: { id: createSkillsDto.resumeid } });
    if (!resume) {
      throw new NotFoundException('Resume not found');
    }
    const Skills = this.SkillsRepository.create(createSkillsDto);
    Skills.resume = resume;
    return this.SkillsRepository.save(Skills);
  }


  async updateSkills(id: number, updateSkillsDto: UpdateSkillsDto): Promise<Skills> {
    const skills = await this.SkillsRepository.findOne({ where: { id } });
    if (!skills) {
      throw new NotFoundException(`Skills with id ${id} not found`);
    }
    
    skills.featuredSkills = updateSkillsDto.featuredSkills;
    skills.descriptions = updateSkillsDto.descriptions;
    
    return this.SkillsRepository.save(skills);
  }
  async findSkillsByResumeId(id: number): Promise<Skills[]> {
    return this.SkillsRepository.find({ where: { resume: { id } } });
  }
  async remove(id: number): Promise<void> {
    await this.SkillsRepository.delete({ resume: { id } });
  }
  
  async findSkill(skill: string): Promise<{ id: number, resumeid: number, FeaturedSkills: FeaturedSkillDto[], descriptions: string }[]> {
    const skills = await this.SkillsRepository
        .createQueryBuilder('skills')
        .select(['skills.id', 'resume.id as resumeid', 'skills.featuredSkills', 'skills.descriptions'])
        .leftJoin('skills.resume', 'resume')
        .where('CAST(skills."featuredSkills" AS TEXT) LIKE :skill', { skill: `%${skill}%` }) // Requête modifiée pour rechercher dans les compétences en vedette
        .getRawMany();

    return skills.map(skill => ({
        id: skill.id,
        resumeid: skill.resumeid,
        FeaturedSkills: skill.featuredSkills, // Les compétences en vedette sont déjà dans le bon format
        descriptions: skill.descriptions,
    }));
}



}