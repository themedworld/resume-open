import { IsNotEmpty, IsString, IsDate, IsNumber } from 'class-validator';

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

  @IsNotEmpty({ message: 'the description is required' })
  @IsString({ message: 'the description must be a string' })
  descriptions: string;
}
