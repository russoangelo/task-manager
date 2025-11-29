import { Body, Controller, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { TaskService } from "./task.service";
import { ApiBearerAuth } from "@nestjs/swagger";
import { JwtGuard } from "src/auth/jwt/jwt.guard";
import { CreateTaskDto, UpdateTaskDto } from "./dto/task.request";
import { ReqUser } from "src/util/user.decorator";

@Controller('task')
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @ApiBearerAuth()
    @UseGuards(JwtGuard)
    @Post()
    async createTask(@Body() dto: CreateTaskDto, @ReqUser() user) {
        return this.taskService.createTask(dto, user.id)
    }

    @ApiBearerAuth()
    @UseGuards(JwtGuard)
    @Get('/user/:userId')
    async getUserTasks(@ReqUser() user) {
        return this.taskService.getAllTask(user.id)
    }

    @ApiBearerAuth()
    @UseGuards(JwtGuard)
    @Get(':id')
    async getById(@Param('id') id: string) {
        return this.taskService.getById(id)
    }

    @ApiBearerAuth()
    @UseGuards(JwtGuard)
    @Patch(':id')
    async updateTask(dto: UpdateTaskDto) {
        return this.taskService.updateTask(dto)
    }
}