import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateSkillsDto {
  @IsNotEmpty({ message: 'the skill name is required' })
  @IsString({ message: 'the skill name must be a string' })
  skill: string;

  @IsNotEmpty({ message: 'the skill level is required' })
  @IsNumber({}, { message: 'the skill level must be a number' })
  featuredSkill: number;

  @IsNotEmpty({ message: 'the resume id is required' })
  @IsNumber({}, { message: 'the resume id must be a number' })
  resumeid: number;
}