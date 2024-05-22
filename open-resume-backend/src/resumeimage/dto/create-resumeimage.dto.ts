import { IsString, IsNotEmpty, IsNumber, IsDefined} from "class-validator";

export class CreateResumeimageDto  {

    @IsNotEmpty({ message: 'the name name is required' })
    @IsString( { message: 'the name name must be a string' })
    fileName: string;
    @IsNotEmpty({ message: 'Le nom du fichier est requis' })
    @IsString({ message: 'Le fichier ne peut pas être vide' })
    documentSize: string;
    @IsNotEmpty({ message: 'Le nom du fichier est requis' })
    document: string;
    @IsNotEmpty({ message: 'the name name is required' })
    @IsNumber({}, { message: 'the name name must be a number' })
    resumeid: number;
    
}

