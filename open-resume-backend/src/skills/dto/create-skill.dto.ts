import { IsNotEmpty, IsString, IsArray, ValidateNested, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateSkillsDto {


  @IsNotEmpty({ message: 'The featuredSkills array is required' })
  @IsArray({ message: 'The featuredSkills must be an array' })
  @ValidateNested({ each: true }) 
  @Type(() => FeaturedSkillDto)
  featuredSkills: FeaturedSkillDto[];

  @IsNotEmpty({ message: 'The descriptions array is required' })
  @IsArray({ message: 'The descriptions must be an array' })
  @IsString({ each: true, message: 'Each description must be a string' })
  descriptions: string[];

  @IsNotEmpty({ message: 'The resume id is required' })
  @IsNumber({}, { message: 'The resume id must be a number' })
  resumeid: number;
}

export class FeaturedSkillDto {
  @IsNotEmpty({ message: 'The skill name is required' })
  @IsString({ message: 'The skill name must be a string' })
  skill: string;

  @IsNotEmpty({ message: 'The rating is required' })
  @IsNumber({}, { message: 'The rating must be a number' })
  rating: number;
}
