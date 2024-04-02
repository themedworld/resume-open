import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProjectDto {
  @IsNotEmpty({ message: 'the resume id is required' })
  resumeid: number;

  @IsNotEmpty({ message: 'the project name is required' })
  @IsString({ message: 'the project name must be a string' })
  project: string;

  @IsNotEmpty({ message: 'the date is required' })
  @IsString({ message: 'the date must be a valid date' })
  date: string;

  @IsNotEmpty({ message: 'the description is required' })
  @IsString({ message: 'the description must be a string' })
  descriptions: string;
}
