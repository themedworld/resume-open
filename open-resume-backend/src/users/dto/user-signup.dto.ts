import { IsNotEmpty, IsEmail, IsString, IsOptional } from 'class-validator';
import { UserSignInDto } from './user-signin.dto';

export class UserSignupDto extends UserSignInDto {

  @IsNotEmpty({ message: "L'adresse e-mail est requise" })
  @IsEmail({}, { message: "L'adresse e-mail doit être valide" })
  email: string;

  @IsOptional()
  @IsString({ message: "Le nom doit être une chaîne de caractères" })
  name?: string;

  @IsOptional()
  @IsString({ message: "Le numéro de téléphone doit être une chaîne de caractères" })
  numtel?: string;

  @IsOptional()
  @IsString({ message: "Le nom de l'entreprise doit être une chaîne de caractères" })
  companyname?: string;

  @IsOptional()
  @IsString({ message: "L'adresse doit être une chaîne de caractères" })
  adresse?: string;
}
