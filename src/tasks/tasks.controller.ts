import {Body, Controller, Delete, Get, Logger, Param, Patch, Post, UseGuards} from '@nestjs/common';
import {TasksService} from "./tasks.service";
import {CreateTaskDto} from "./dto/create-task.dto";
import {UpdateTaskDto} from "./dto/update-task.dto";
import {GetTasksFilterDto} from "./dto/get-tasks-filter.dto";
import {AuthGuard} from "@nestjs/passport";
import {GetUser} from "../auth/get-user.decorator";
import {User} from "../auth/user.entity";
import {ConfigService} from "@nestjs/config";

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    private logger = new Logger('TasksController');

    constructor(private taskService: TasksService, private configService: ConfigService) {
        console.log(configService.get('TEST'));
    }

    @Get()
    getTasks(@Body() getTasksFilterDto: GetTasksFilterDto, @GetUser() user: User) {
        this.logger.verbose(`User "${user.username}" retrieving all tasks. Filters: ${JSON.stringify(getTasksFilterDto)}`);
        return this.taskService.getTasks(getTasksFilterDto, user);
    }

    @Get(':id')
    getTask(@Param('id') id: string, @GetUser() user: User) {
        this.logger.verbose(`User "${user.username}" retrieving task. ID: ${id}`);
        return this.taskService.getTask(id, user);
    }

    @Delete(':id')
    deleteTask(@Param('id') id: string, @GetUser() user: User) {
        this.logger.verbose(`User "${user.username}" deleting task. ID: ${id}`);
        return this.taskService.deleteTask(id, user);
    }

    @Patch(':id/status')
    updateTask(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto, @GetUser() user: User) {
        this.logger.verbose(`User "${user.username}" updating task. Data: ${JSON.stringify(updateTaskDto)}`);
        return this.taskService.updateTask(id, updateTaskDto, user);
    }

    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto, @GetUser() user: User) {
        this.logger.verbose(`User "${user.username}" creating task. Data: ${JSON.stringify(createTaskDto)}`);
        return this.taskService.createTask(createTaskDto, user);
    }
}
