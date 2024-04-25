import { ResSet } from './../Resume-Setting/entities/res-set.entity';
import { WorkExp } from './../work-experience/entities/work-exp.entity';
import { Skills } from './../skills/entities/skill.entity';
import { Language } from './../language/entities/language.entity';
import { PerInf } from './../Personal-information/entities/per-inf.entity';
import { CusSec } from './../Custumer-serction/entities/cus-sec.entity';
import { Controller, Get, Post, Body, Patch, Param, Delete, Put, ParseIntPipe,NotFoundException } from '@nestjs/common';
import { ResumeService } from './resume.service';
import { CreateResumeDto } from './dto/create-resume.dto';
import { Resume } from './entities/resume.entity';
import { UpdateResumeNameDto } from './dto/update-resumename.dto';
import { UsersService } from 'src/users/users.service';
import { CusSecService } from 'src/Custumer-serction/cus-sec.service';
import { EducationService } from 'src/education/education.service';
import { LanguageService } from 'src/language/language.service';
import { PerInfService } from 'src/Personal-information/per-inf.service';
import { ProjectService } from 'src/project/project.service';
import { ResSetService } from 'src/Resume-Setting/res-set.service';
import { SkillsService } from 'src/skills/skills.service';
import { WorkExpService } from 'src/work-experience/work-exp.service';
@Controller('resume')
export class ResumeController {
  constructor(
    private readonly resumeService: ResumeService,
    private readonly usersService: UsersService,
    private readonly educationService: EducationService,
    private readonly languageService: LanguageService,
    private readonly perInfService: PerInfService,
    private readonly projectService: ProjectService,
    private readonly resSetService: ResSetService,
    private readonly skillsService: SkillsService,
    private readonly workExpService: WorkExpService,
    private readonly cusSecService: CusSecService,

  ) {}

  @Post('createresume')
  async createresume(@Body() createResumeDto: CreateResumeDto): Promise<{ resume: Resume }> {
    const resume = await this.resumeService.createResume(createResumeDto);
    return { resume };
  } 

  @Get(':id')
  async findResumeByUserId(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ resumes: Resume[]; count: number }> {
    const resumes = await this.resumeService.findResumeByUserId(id);
    const count = resumes.length;
    return { resumes, count };
  }

  @Get('resume/:id')
  findOne(@Param('id') id: string) {
    return this.resumeService.findOne(+id);
  }

  @Put(':id/name')
  async updateName(@Param('id') id: number, @Body() updateResumeNameDto: UpdateResumeNameDto): Promise<Resume> {
    return this.resumeService.updateName(id, updateResumeNameDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.resumeService.remove(+id);
  }

  @Get()
  async getAllResumes(): Promise<any> {
    // Récupérer tous les utilisateurs avec le rôle "demandeur"
    const users = await this.usersService.findUsersByRole('demandeur');

    // Mappez chaque utilisateur pour obtenir ses résumés avec les sections personnalisées et les éducations associées
    const usersWithResumes = await Promise.all(users.map(async (user) => {
      const resumes = await this.resumeService.findResumeByUserId(user.id);
      const resumesWithDetails = await Promise.all(resumes.map(async (resume) => {
        const perInfs = await this.perInfService.findPerInfByResumeId(resume.id);
        const educations = await this.educationService.findEducationByResumeId(resume.id);
        const languages = await this.languageService.findLanguageByResumeId(resume.id);
        const skills = await this.skillsService.findSkillsByResumeId(resume.id);
        const WorkExps = await this.workExpService.findWorkExpByResumeId(resume.id);

        return { resume, perInfs, educations, languages, WorkExps, skills };
      }));
      return { user, resumes: resumesWithDetails };
    }));

    return usersWithResumes;
  }

  @Get("UpdateView/:id")
  async getResumeById(@Param("id") resumeId: number): Promise<any> {
   
    const resume = await this.resumeService.findOne(resumeId);
    
    // Vérifier si le CV existe
    if (!resume) {
      throw new NotFoundException("CV non trouvé");
    }
  
    // Récupérer les détails associés au CV
    const perInfs = await this.perInfService.findPerInfByResumeId(resumeId);
    const educations = await this.educationService.findEducationByResumeId(resumeId);
    const languages = await this.languageService.findLanguageByResumeId(resumeId);
    const projects = await this.projectService.findProjectByResumeId(resumeId);
    const skills = await this.skillsService.findSkillsByResumeId(resumeId);
    const workExps = await this.workExpService.findWorkExpByResumeId(resumeId);
    const cusSecs = await this.cusSecService.findCusSecByResumeId(resumeId);

  
   
    return {
      ResumeProfile: perInfs,
      educations,
      languages,
      projects,
      workExperiences: workExps,
      skills,
      custom: cusSecs,
    };
  }
  
}
