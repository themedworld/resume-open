import { IsNotEmpty, IsString,  IsArray } from 'class-validator';

class UpdateCusSecDto {

  @IsNotEmpty({ message: 'The descriptions array is required' })
  @IsArray({ message: 'The descriptions must be an array' })
  @IsString({ each: true, message: 'Each description must be a string' })
  descriptions: string[];
}

export { UpdateCusSecDto };