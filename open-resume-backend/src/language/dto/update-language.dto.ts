import { IsNotEmpty, IsString,  IsArray } from 'class-validator';

export class UpdateLanguageDto {

  @IsNotEmpty({ message: 'the language name is required' })
  @IsString({ message: 'the language name must be a string' })
  language: string;

  @IsNotEmpty({ message: 'The descriptions array is required' })
  @IsArray({ message: 'The descriptions must be an array' })
  @IsString({ each: true, message: 'Each description must be a string' })
  descriptions: string[];
}
