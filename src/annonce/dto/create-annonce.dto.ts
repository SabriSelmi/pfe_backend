import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Utilisateur } from "src/utilisateur/entities/utilisateur.entity";

export class CreateAnnonceDto {

    @IsString()
    @IsNotEmpty()
    readonly titre: string;

    @IsString()
    @IsNotEmpty()
    readonly description: string;

    @IsString()
    @IsNotEmpty()
    readonly prix: string;

    @IsString()
    @IsNotEmpty()
    readonly reduction?: string;

    @IsBoolean()
    @IsNotEmpty()
    readonly confirmed: boolean;

    @IsBoolean()
    @IsNotEmpty()
    readonly isFavorited: boolean;

    @IsString()
    @IsNotEmpty()
    readonly category: string;

    @IsString()
    @IsNotEmpty()
    readonly client: string;

    @IsString()
    @IsNotEmpty()
    readonly vendeur: string;

    @IsString()
    @IsNotEmpty()
    photo: string;

}


