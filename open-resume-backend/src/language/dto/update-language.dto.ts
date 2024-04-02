import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateLanguageDto {

  @IsNotEmpty({ message: 'the language name is required' })
  @IsString({ message: 'the language name must be a string' })
  language: string;

  @IsNotEmpty({ message: 'the proficiency level is required' })
  @IsString({ message: 'the proficiency level must be a string' })
  descriptions: string;
}
