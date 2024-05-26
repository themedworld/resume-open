import { Resumeimage } from 'src/resumeimage/entities/resumeimage.entity';
import { Photo } from './../photo/entities/photo.entity';

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
import { UploadedFileService } from 'src/photo/photo.service';
import { ResumeimageService } from 'src/resumeimage/resumeimage.service';
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
    private readonly uploadedFileService:UploadedFileService,
    private readonly resumeimageService:ResumeimageService,
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

  @Get('EYA/:id')
  async findOne(@Param('id') id: string) {
    const resume = await this.resumeService.findOne(+id);
    const perInfs = await this.perInfService.findPerInfByResumeId(resume.id);
    const photo = await this.uploadedFileService.findPhotoByResumeId(resume.id);
    const resumeImage = await this.resumeimageService.findPhotoByResumeId(resume.id);

    return {
      resume,
      ResumeProfile: perInfs,
      Photo: photo,
      Resumeimage: resumeImage,
    };
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
      // Récupérer le nom et l'ID de l'utilisateur
      const { name, id } = user;

      // Récupérer les résumés de l'utilisateur avec les détails associés
      const resumes = await this.resumeService.findResumeByUserId(user.id);
      const resumesWithDetails = await Promise.all(resumes.map(async (resume) => {
        const perInfs = await this.perInfService.findPerInfByResumeId(resume.id);
        const location = perInfs ? perInfs.location : null;
        const languages = await this.languageService.findLanguageByResumeId(resume.id);
        const Languagess = languages.map(Language => ({ Language: Language.language }));
        const skills = await this.skillsService.findSkillsByResumeId(resume.id);
        const featuredSkills = skills.map(skill => ({ skill: skill.featuredSkills }));
        const WorkExps = await this.workExpService.findWorkExpByResumeId(resume.id);
        const workExpsWithJobTitles = WorkExps.map(workExp => ({ jobTitle: workExp.jobTitle }));
        return { resume, location, languagess:Languagess, jobTitle:workExpsWithJobTitles, featuredSkills:featuredSkills };
      }));

      return { user: { name, id }, resumes: resumesWithDetails };
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
    const resSet = await this.resSetService.findResSetByResumeId(resumeId);
  
   
    return {
      resume,
      ResumeProfile: perInfs,
      educations,
      languages,
      projects,
      workExperiences: workExps,
      skills,
      custom: cusSecs,
      Setting:resSet,
    };
  }
  

  @Get(':userId/resumes')
  async getUserResumes(@Param('userId', ParseIntPipe) userId: number): Promise<any> {
    // Trouver les CV associés à l'utilisateur
    const resumes: Resume[] = await this.resumeService.findResumeByUserId(userId);
    const count = resumes.length;
    // Vérifier si l'utilisateur a des CV
    if (resumes.length === 0) {
      throw new NotFoundException('Aucun CV trouvé pour cet utilisateur');
    }

    // Récupérer les informations pour chaque CV
    const resumesWithDetails = await Promise.all(
      resumes.map(async (resume) => {
        const perInfs = await this.perInfService.findPerInfByResumeId(resume.id);
        const photo=await this.uploadedFileService.findPhotoByResumeId(resume.id);
        const Resumeimage=await this.resumeimageService.findPhotoByResumeId(resume.id);

        return {
          resume,
          ResumeProfile: perInfs,
          Photo:photo,
          Resumeimage:Resumeimage,
       
        };
      }),
    );

    return {resumesWithDetails ,count};
  }

}
