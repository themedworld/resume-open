import { IsNotEmpty, IsString} from 'class-validator';

 class UpdateProjectDto {

  @IsNotEmpty({ message: 'the project name is required' })
  @IsString({ message: 'the project name must be a string' })
  project: string;

  @IsNotEmpty({ message: 'the date is required' })
  @IsString({ message: 'the date must be a valid date' })
  date: string;

  @IsNotEmpty({ message: 'the description is required' })
  @IsString({ message: 'the description must be a string' })
  descriptions: string;
}
export { UpdateProjectDto};