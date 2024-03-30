import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateCommentaireDto {

    @IsBoolean()
    @IsNotEmpty()
    readonly confirmed: boolean;

    @IsString()
    @IsNotEmpty()
    readonly contenu: string;

    @IsString()
    @IsNotEmpty()
    readonly auteur: string;

    
    @IsString()
    @IsNotEmpty()
    readonly annonce: string;

}


