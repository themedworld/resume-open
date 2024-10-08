import { IsNotEmpty, IsString, IsDate, IsNumber,  IsArray } from 'class-validator';

export class UpdateWorkExpDto {

  @IsNotEmpty({ message: 'the company name is required' })
  @IsString({ message: 'the company name must be a string' })
  company: string;

  @IsNotEmpty({ message: 'the job title is required' })
  @IsString({ message: 'the job title must be a string' })
  jobTitle: string;

  @IsNotEmpty({ message: 'the date is required' })
  @IsString({ message: 'the date must be a valid date' })
  date: string;

  @IsNotEmpty({ message: 'The descriptions array is required' })
  @IsArray({ message: 'The descriptions must be an array' })
  @IsString({ each: true, message: 'Each description must be a string' })
  descriptions: string[];
}
