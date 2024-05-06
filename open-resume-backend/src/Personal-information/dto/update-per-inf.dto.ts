import { IsNotEmpty, IsString,  IsArray } from 'class-validator';

export class UpdatePerInfDto {

  @IsNotEmpty({ message: 'the name is required' })
  @IsString({ message: 'the name must be a string' })
  name: string;

  @IsNotEmpty({ message: 'the objective is required' })
  @IsString({ message: 'the objective must be a string' })
  summary: string;

  @IsNotEmpty({ message: 'the email is required' })
  @IsString({ message: 'the email must be a valid email' })
  email: string;

  @IsNotEmpty({ message: 'the phone number is required' })
  @IsString({ message: 'the phone number must be a string' })
  phone: string;

  @IsNotEmpty({ message: 'the location is required' })
  @IsString({ message: 'the location must be a string' })
  location: string;

  @IsNotEmpty({ message: 'the website is required' })
  @IsString({ message: 'the website must be a string' })
  url: string;
}