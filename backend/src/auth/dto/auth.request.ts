import { IsEmail, IsNotEmpty, IsString, IsUUID } from "class-validator";

export class LoginDto {
    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @IsString()
    password: string
}

export class RefreshTokenDto {
    @IsNotEmpty()
    @IsString()
    refreshToken: string
}

export class RegisterDto {
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty()
    surname: string

    @IsString()
    @IsNotEmpty()
    password: string
}