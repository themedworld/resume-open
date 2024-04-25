export interface ResumeProfile {

  name: string ;
  email: string;
  phone: string;
  url: string;
  summary: string;
  location: string;
}

export interface ResumeWorkExperience {
  id:number;
  company: string;
  jobTitle: string;
  date: string;
  descriptions: string[];
}

export interface ResumeEducation {
  id:number;
  school: string;
  degree: string;
  date: string;
  gpa: string;
  descriptions: string[];
 
  
}

export interface ResumeProject {
  id:number;
  project: string;
  date: string;
  descriptions: string[];
}

export interface FeaturedSkill {
  id:number;
  skill: string;
  rating: number;
}

export interface ResumeSkills {
  id:number;
  featuredSkills: FeaturedSkill[];
  descriptions: string[];
}

export interface ResumeCustom {
  id:number;
  descriptions: string[];
}
export interface ResumeLanguage {
  id:number;
  language: string;
  descriptions: string[];
}
export interface Resume {
  id:number;
  profile: ResumeProfile;
  workExperiences: ResumeWorkExperience[];
  educations: ResumeEducation[];
  projects: ResumeProject[];
  skills: ResumeSkills;
  custom: ResumeCustom;
  languages:ResumeLanguage[];
}

export type ResumeKey = keyof Resume;