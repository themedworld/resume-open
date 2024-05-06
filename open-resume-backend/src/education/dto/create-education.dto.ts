import { IsNotEmpty, IsString, IsDate, IsOptional, IsNumber,  IsArray } from 'class-validator';

class CreateEducationDto {

  @IsNotEmpty()
  @IsNumber({})
  resumeid: number;

  @IsNotEmpty({ message: 'School name is required' })
  @IsString({ message: 'School name must be a string' })
  school: string;

  @IsNotEmpty({ message: 'Education date is required' })
  @IsString({ message: 'Education date must be a string' })
  date: string;

  @IsNotEmpty({ message: 'Degree is required' })
  @IsString({ message: 'Degree must be a string' })
  degree: string;

  @IsOptional()
  @IsString({ message: 'GPA must be a string' })
  gpa: string;

  @IsNotEmpty({ message: 'The descriptions array is required' })
  @IsArray({ message: 'The descriptions must be an array' })
  @IsString({ each: true, message: 'Each description must be a string' })
  descriptions: string[];
}

export { CreateEducationDto };
