import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

class CreateCusSecDto {
  @IsNotEmpty({ message: "is required" })
  @IsNumber({},{ message: "is a number" })
  resumeid: number;
  @IsNotEmpty({ message: "is required" })
  @IsString({ message: "is a string" })
  Custom_Textbox: string;
}

export { CreateCusSecDto };