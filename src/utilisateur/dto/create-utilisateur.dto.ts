import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateUtilisateurDto {

    @IsString()
    @IsNotEmpty()
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    readonly nom: string;

    @IsString()
    @IsNotEmpty()
    readonly username: string;

    @IsString()
    @IsNotEmpty()
    readonly password: string;

    @IsString()
    @IsNotEmpty()
    readonly adresse: string;

    @IsString()
    @IsNotEmpty()
    photo: string;

    @IsString()
    socketId: string;

    @IsString()
    @IsNotEmpty()
    refreshToken: string;

}


