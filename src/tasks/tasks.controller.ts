import {Body, Controller, Get, Param, Post, Delete, Patch} from '@nestjs/common';
import {TasksService} from "./tasks.service";
import {CreateTaskDto} from "./dto/create-task.dto";
import {UpdateTaskDto} from "./dto/update-task.dto";
import {GetTasksFilterDto} from "./dto/get-tasks-filter.dto";

@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService) {}

    @Get()
    getTasksFilter(@Body() getTasksFilterDto : GetTasksFilterDto){
        if (Object.keys(getTasksFilterDto).length)
            return this.taskService.getTasksFilter(getTasksFilterDto);
        return this.taskService.getAllTasks();
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
