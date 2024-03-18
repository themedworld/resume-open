import { IsNotEmpty, IsString, IsDate, IsOptional,IsNumber } from 'class-validator';

class CreateEducationDto {

  @IsNotEmpty({ message: 'the resume is required' })
  @IsNumber({},{ message: 'the resumeid must be a number' })
  resumeid: number;

  
  @IsNotEmpty({ message: 'is required' })
  @IsString({ message: 'the school name must be a string' })
  school: string;

  @IsNotEmpty({ message: 'the education date is required' })
  @IsDate({ message: 'the education date must be a date' })
  date: Date;

  @IsNotEmpty({ message: 'the degree is required' })
  @IsString({ message: 'the degree must be a string' })
  degree: string;

  @IsOptional()
  @IsString({ message: 'the GPA must be a string' })
  gpa: string;

  @IsOptional()
  @IsString({ message: 'additional information must be a string' })
  additionalInformation: string;
}

export { CreateEducationDto } ;