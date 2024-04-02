import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

class CreateCusSecDto {
  @IsNotEmpty()

  resumeid: number;
  @IsNotEmpty({ message: "is required" })
  @IsString({ message: "is a string" })
  descriptions: string;
}

export { CreateCusSecDto };