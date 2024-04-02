import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

class CreateResSetDto {
  @IsNotEmpty({ message: 'resumeid is required' })
  @IsNumber({},{ message: 'resume id must be a number' })
  resumeid: number;
  @IsNotEmpty({ message: 'theme color is required' })
  @IsString({ message: 'theme color must be a string' })
  themeColor: string;

  @IsNotEmpty({ message: 'the font size is required' })
  @IsString({ message: 'the font size must be a string' })
  fontSize: string;
  
  @IsNotEmpty({ message: 'the font family is required' })
  @IsString({ message: 'the font family must be a string' })
  fontFamily: string; 
  @IsNotEmpty({ message: 'the document size is required' })
  @IsString({ message: 'the document size must be a string' })
  documentSize: string;
}
export { CreateResSetDto };