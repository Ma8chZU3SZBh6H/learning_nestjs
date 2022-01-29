import {Body, Controller, Delete, Get, Param, Patch, Post, UseGuards} from '@nestjs/common';
import {TasksService} from "./tasks.service";
import {CreateTaskDto} from "./dto/create-task.dto";
import {UpdateTaskDto} from "./dto/update-task.dto";
import {GetTasksFilterDto} from "./dto/get-tasks-filter.dto";
import {AuthGuard} from "@nestjs/passport";
import {GetUser} from "../auth/get-user.decorator";
import {User} from "../auth/user.entity";

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    constructor(private taskService: TasksService) {
    }

    @Get()
    getTasks(@Body() getTasksFilterDto: GetTasksFilterDto, @GetUser() user: User) {
        return this.taskService.getTasks(getTasksFilterDto, user);
    }

    @Get(':id')
    getTask(@Param('id') id: string, @GetUser() user: User) {
        return this.taskService.getTask(id, user);
    }

    @Delete(':id')
    deleteTask(@Param('id') id: string, @GetUser() user: User) {
        return this.taskService.deleteTask(id, user);
    }

    @Patch(':id/status')
    updateTask(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto, @GetUser() user: User) {
        return this.taskService.updateTask(id, updateTaskDto, user);
    }

    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto, @GetUser() user: User) {
        return this.taskService.createTask(createTaskDto, user);
    }
}
