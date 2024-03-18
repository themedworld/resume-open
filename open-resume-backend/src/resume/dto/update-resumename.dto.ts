import { IsNotEmpty, IsString } from 'class-validator';
class UpdateResumeNameDto {
  @IsNotEmpty({ message: 'the name is required' })
  @IsString({ message: 'the name is a string' })
  name: string;
}

export { UpdateResumeNameDto };