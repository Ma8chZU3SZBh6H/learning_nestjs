import {Body, Controller, Get, Param, Post, Delete, Patch, NotFoundException} from '@nestjs/common';
import {TasksService} from "./tasks.service";
import {CreateTaskDto} from "./dto/create-task.dto";
import {UpdateTaskDto} from "./dto/update-task.dto";
import {GetTasksFilterDto} from "./dto/get-tasks-filter.dto";

@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService) {}

    @Get()
    getTasks(@Body() getTasksFilterDto : GetTasksFilterDto){
        return this.taskService.getTasks(getTasksFilterDto);
    }

    @Get(':id')
    getTask(@Param('id') id : string){
        return this.taskService.getTask(id);
    }

    @Delete(':id')
    deleteTask(@Param('id') id : string){
        return this.taskService.deleteTask(id);
    }

    @Patch(':id/status')
    updateTask(@Param('id') id:string, @Body() updateTaskDto : UpdateTaskDto){
        return this.taskService.updateTask(id, updateTaskDto);
    }

    @Post()
    createTask(@Body() createTaskDto : CreateTaskDto){
        return this.taskService.createTask(createTaskDto);
    }
}
