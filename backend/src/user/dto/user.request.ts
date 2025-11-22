import { IsEmail, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class UserCreateDto {
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

export class UserUpdateDto {
    @IsUUID()
    id: string

    @IsEmail()
    @IsOptional()
    email?: string

    @IsString()
    @IsOptional()
    name?: string

    @IsString()
    @IsOptional()
    surname?: string
}
