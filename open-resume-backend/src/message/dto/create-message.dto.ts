import { IsNotEmpty, IsString } from 'class-validator';
import { IsNumber } from 'class-validator';
export class CreateMessageDto {
  
  @IsNotEmpty({ message: 'the name is required' })
  @IsNumber({}, { message: 'the id user is a number' })
  id: number;

  @IsNotEmpty({ message: 'the name is required' })
  @IsString({ message: 'the name is a string' })
  Message: string;
  @IsNotEmpty({ message: 'the user id is required' })
  @IsNumber({}, { message: 'the id user is a number' })
  receiver: number;

  @IsNotEmpty({ message: 'the user id is required' })
  @IsNumber({}, { message: 'the id user is a number' })
  sender: number;}
