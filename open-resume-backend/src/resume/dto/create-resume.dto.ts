import { IsNotEmpty, IsString } from 'class-validator';
import { IsNumber } from 'class-validator';
class CreateResumeDto  {
  @IsNotEmpty({ message: 'the user id is required' })
  @IsNumber({}, { message: 'the id user is a number' })
  iduser: number;
  @IsNotEmpty({ message: 'the name is required' })
  @IsString({ message: 'the name is a string' })
  name: string;
}
export { CreateResumeDto};