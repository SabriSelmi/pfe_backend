import { IsNotEmpty } from "class-validator";

export class CreateLoginDto {
    @IsNotEmpty()
    readonly password: string;
    readonly username: string;
}
