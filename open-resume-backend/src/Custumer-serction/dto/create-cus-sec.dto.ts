import { IsNotEmpty, IsNumber, IsString,  IsArray } from 'class-validator';

class CreateCusSecDto {
  @IsNotEmpty()

  resumeid: number;
  @IsNotEmpty({ message: 'The descriptions array is required' })
  @IsArray({ message: 'The descriptions must be an array' })
  @IsString({ each: true, message: 'Each description must be a string' })
  descriptions: string[];
}

export { CreateCusSecDto };