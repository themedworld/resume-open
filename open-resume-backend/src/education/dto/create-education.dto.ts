import { IsNotEmpty, IsString, IsDate, IsOptional, IsNumber } from 'class-validator';

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

  @IsOptional()
  @IsString({ message: 'Additional information must be a string' })
  descriptions: string;
}

export { CreateEducationDto };
