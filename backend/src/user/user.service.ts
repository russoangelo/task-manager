import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import { UserCreateDto, UserUpdateDto } from "./dto/user.request";
import bcrypt from "node_modules/bcryptjs";

@Injectable()
export class UserService {
    constructor(private readonly prismaService: PrismaService) {}

    async getById(id: string) {
        const user = await this.prismaService.user.findUnique({
            where: {
                id
            }
        })

        if(!user) {
            throw new NotFoundException("User not found!")
        }

        return user
    }

    async create(dto: UserCreateDto) {
        const user = await this.prismaService.user.findUnique({
            where: {
                email: dto.email,
            },
        })

        if(user){
            throw new ConflictException("User already exists!")
        }

        const passwordHashed = await bcrypt.hash(dto.password, 12)

        return this.prismaService.user.create({
            data: {
                email: dto.email,
                name: dto.name,
                surname: dto.surname,
                passwordHash: passwordHashed
            }
        })
    }

    async update(dto: UserUpdateDto) {
        const user = await this.prismaService.user.findUnique({
            where: {
                id: dto.id
            }
        })

        if(!user) {
            throw new NotFoundException("User not found!")
        }

        const data: any = {}

        if(dto.email !== undefined) data.email = dto.email
        if(dto.name !== undefined) data.name = dto.name
        if(dto.surname !== undefined) data.surname = dto.surname

        return this.prismaService.user.update({
            where: {
                id: dto.id
            },
            data
        })
    }

    async delete(id: string) {
        const user = await this.prismaService.user.findUnique({
            where: {
                id
            }
        })

        if(!user) {
            throw new NotFoundException("User not found")
        }

        return this.prismaService.user.delete({
            where: {
                id
            }
        })
    }
}