import { StatusEnum } from "@prisma/client";
import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateTaskDto {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsString()
    description: string
}

export class UpdateTaskDto {
    @IsNotEmpty()
    @IsUUID()
    id: string

    @IsOptional()
    @IsString()
    name: string

    @IsOptional()
    @IsString()
    description: string

    @IsOptional()
    @IsEnum(StatusEnum)
    status: StatusEnum

    @IsNotEmpty()
    @IsUUID()
    userId: string
}
