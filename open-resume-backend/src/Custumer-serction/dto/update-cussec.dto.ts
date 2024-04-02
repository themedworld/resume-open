import { IsNotEmpty, IsString } from 'class-validator';

class UpdateCusSecDto {

  @IsNotEmpty({ message: "is required" })
  @IsString({ message: "is a string" })
  descriptions: string;
}

export { UpdateCusSecDto };