import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import { CreateTaskDto, UpdateTaskDto } from "./dto/task.request";

@Injectable()
export class TaskService {
    constructor(private readonly prismaService: PrismaService) {}

    async createTask(dto: CreateTaskDto, userId: string){
        return await this.prismaService.task.create({
            data: {
                name: dto.name,
                description: dto.description,
                userId
            }
        })
    }

    async getAllTask(userId: string) {
        return await this.prismaService.task.findMany({
            where: {
                userId: userId
            }
        })
    }

    async getById(taskId: string) {
        return await this.prismaService.task.findUnique({
            where: {
                id: taskId
            }
        })
    }

    async updateTask(dto: UpdateTaskDto){
        const task = await this.getById(dto.id)

        if(!task) {
            throw new NotFoundException('Task not found')
        }

        const data: any = {}

        if(dto.name !== undefined) data.name = dto.name;
        if(dto.description !== undefined) data.description = dto.description;
        if(dto.status !== undefined) data.status = dto.status;

        return await this.prismaService.task.update({
            where: {
                id: dto.id
            },
            data
        })
    }

    async deleteTask(id: string) {
        return await this.prismaService.task.delete({
            where: {
                id
            }
        })
    }
}