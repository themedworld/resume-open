import { IsNotEmpty, IsString, IsDate, IsNumber } from 'class-validator';

export class CreateProjectDto {
  @IsNotEmpty({ message: 'the project name is required' })
  @IsNumber({}, { message: 'the project name must be a string' })
  resumeid: number;

  @IsNotEmpty({ message: 'the project name is required' })
  @IsString({ message: 'the project name must be a string' })
  projectName: string;

  @IsNotEmpty({ message: 'the date is required' })
  @IsDate({ message: 'the date must be a valid date' })
  date: Date;

  @IsNotEmpty({ message: 'the description is required' })
  @IsString({ message: 'the description must be a string' })
  description: string;
}