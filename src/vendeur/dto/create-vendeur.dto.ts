import { IsBoolean, IsNotEmpty, IsString } from "class-validator";
import { CreateUtilisateurDto } from "src/utilisateur/dto/create-utilisateur.dto";

export class CreateVendeurDto extends CreateUtilisateurDto{
    @IsString()
    @IsNotEmpty()
    readonly domaine: string;
    @IsBoolean()
    @IsNotEmpty()
    readonly confirmed: boolean;

}


