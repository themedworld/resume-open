import { IsNotEmpty, IsString, IsDate, IsNumber } from 'class-validator';

export class CreateWorkExpDto {
  @IsNotEmpty({ message: 'the job title is required' })
  @IsNumber({}, { message: 'the job title must be a string' })
  resumeid: number;

  @IsNotEmpty({ message: 'the company name is required' })
  @IsString({ message: 'the company name must be a string' })
  companyName: string;

  @IsNotEmpty({ message: 'the job title is required' })
  @IsString({ message: 'the job title must be a string' })
  jobTitle: string;

  @IsNotEmpty({ message: 'the date is required' })
  @IsDate({ message: 'the date must be a valid date' })
  date: Date;

  @IsNotEmpty({ message: 'the description is required' })
  @IsString({ message: 'the description must be a string' })
  description: string;
}
