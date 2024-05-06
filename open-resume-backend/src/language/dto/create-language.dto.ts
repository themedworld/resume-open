import { IsNotEmpty, IsString, IsNumber,  IsArray } from 'class-validator';

export class CreateLanguageDto {
  @IsNotEmpty({ message: 'the language name is required' })
  @IsNumber({}, { message: 'the language name must be a string' })
  resumeid: number;

  @IsNotEmpty({ message: 'the language name is required' })
  @IsString({ message: 'the language name must be a string' })
  language: string;

  @IsNotEmpty({ message: 'The descriptions array is required' })
  @IsArray({ message: 'The descriptions must be an array' })
  @IsString({ each: true, message: 'Each description must be a string' })
  descriptions: string[];
}
