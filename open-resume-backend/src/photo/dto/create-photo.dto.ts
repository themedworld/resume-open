// src/dto/UploadedFile.dto.ts
import { IsString, IsNotEmpty, IsNumber, IsDefined} from "class-validator";

export class PhotoDto {

    @IsNotEmpty({ message: 'the name name is required' })
    @IsString( { message: 'the name name must be a string' })
    name: string;
    @IsNotEmpty({ message: 'Le nom du fichier est requis' })
    @IsString({ message: 'Le fichier ne peut pas être vide' })
    size: string;
    @IsNotEmpty({ message: 'Le nom du fichier est requis' })
    @IsString({ message: 'Le fichier ne peut pas être vide' })
    fileUrl: string;
    @IsNotEmpty({ message: 'the name name is required' })
    @IsNumber({}, { message: 'the name name must be a number' })
    resumeid: number;
    
}
