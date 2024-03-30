import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateCategorieDto {

    @IsString()
    @IsNotEmpty()
    readonly nom: string;

    @IsString()
    @IsNotEmpty()
    readonly description: string;

}


