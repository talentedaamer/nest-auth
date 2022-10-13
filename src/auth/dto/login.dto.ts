import {IsEmail, IsNotEmpty, IsOptional} from "class-validator";

export class LoginDto {
    @IsOptional()
    user_name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
}