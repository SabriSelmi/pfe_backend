import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateFavorisDto {

    @IsString()
    @IsNotEmpty()
    readonly annonce: string;

    @IsString()
    @IsNotEmpty()
    readonly user: string;

}


