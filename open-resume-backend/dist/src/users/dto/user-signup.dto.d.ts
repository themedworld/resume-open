import { UserSignInDto } from './user-signin.dto';
export declare class UserSignupDto extends UserSignInDto {
    email: string;
    name?: string;
    numtel?: string;
    companyname?: string;
    adresse?: string;
}
