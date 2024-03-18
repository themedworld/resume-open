import { IsNotEmpty, IsString } from 'class-validator';

class UpdateCusSecDto {

  @IsNotEmpty({ message: "is required" })
  @IsString({ message: "is a string" })
  Custom_Textbox: string;
}

export { UpdateCusSecDto };