import { IsNotEmpty, IsString } from 'class-validator';

class UpdateResSetDto {
  @IsNotEmpty({ message: 'theme color is required' })
  @IsString({ message: 'theme color must be a string' })
  themeColor: string;

  @IsNotEmpty({ message: 'the font size is required' })
  @IsString({ message: 'the font size must be a string' })
  fontSize: string;

  @IsNotEmpty({ message: 'the document size is required' })
  @IsString({ message: 'the document size must be a string' })
  documentSize: string;
}
export { UpdateResSetDto };