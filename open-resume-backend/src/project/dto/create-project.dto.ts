import { IsNotEmpty, IsString,  IsArray } from 'class-validator';

export class CreateProjectDto {
  @IsNotEmpty({ message: 'the resume id is required' })
  resumeid: number;

  @IsNotEmpty({ message: 'the project name is required' })
  @IsString({ message: 'the project name must be a string' })
  project: string;

  @IsNotEmpty({ message: 'the date is required' })
  @IsString({ message: 'the date must be a valid date' })
  date: string;

  @IsNotEmpty({ message: 'The descriptions array is required' })
  @IsArray({ message: 'The descriptions must be an array' })
  @IsString({ each: true, message: 'Each description must be a string' })
  descriptions: string[];
}
