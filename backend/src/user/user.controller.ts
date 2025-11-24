import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { JwtGuard } from "src/auth/jwt/jwt.guard";
import { ApiBearerAuth } from "@nestjs/swagger";
import { UserCreateDto, UserUpdateDto } from "./dto/user.request";

@Controller("user")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @ApiBearerAuth()
    @UseGuards(JwtGuard)
    @Get(':id')
    async getUserById(@Param('id') id: string) {
        return this.userService.getById(id);
    }

    @Post()
    async createUser(@Body() dto: UserCreateDto) {
        return this.userService.create(dto);
    }

    @ApiBearerAuth()
    @UseGuards(JwtGuard)
    @Patch(':id')
    async updateUser(@Body() dto: UserUpdateDto) {
        return this.userService.update(dto);
    }

    @ApiBearerAuth()
    @UseGuards(JwtGuard)
    @Delete(':id')
    async delete(@Param('id') id: string){
        return this.userService.delete(id);
    }
}