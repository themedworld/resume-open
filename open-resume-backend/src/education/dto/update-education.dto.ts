import { IsNotEmpty, IsString, IsDate, IsOptional} from 'class-validator';

class UpdateEducationDto {

  @IsNotEmpty({ message: 'is required' })
  @IsString({ message: 'the school name must be a string' })
  school: string;

  @IsNotEmpty({ message: 'the education date is required' })
  @IsString({ message: 'the education date must be a date' })
  date: string;

  @IsNotEmpty({ message: 'the degree is required' })
  @IsString({ message: 'the degree must be a string' })
  degree: string;

  @IsOptional()
  @IsString({ message: 'the GPA must be a string' })
  gpa: string;

  @IsOptional()
  @IsString({ message: 'additional information must be a string' })
  descriptions: string;
}

export { UpdateEducationDto  } ;