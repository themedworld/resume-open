import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateLanguageDto {
  @IsNotEmpty({ message: 'the language name is required' })
  @IsNumber({}, { message: 'the language name must be a string' })
  resumeid: number;

  @IsNotEmpty({ message: 'the language name is required' })
  @IsString({ message: 'the language name must be a string' })
  languageName: string;

  @IsNotEmpty({ message: 'the proficiency level is required' })
  @IsString({ message: 'the proficiency level must be a string' })
  proficiency: string;
}
