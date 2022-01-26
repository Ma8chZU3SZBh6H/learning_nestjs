import {Body, Controller, Get, Param, Post, Delete} from '@nestjs/common';
import {TasksService} from "./tasks.service";
import {CreateTaskDto} from "./dto/create-task.dto";

@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService) {

    }

    @Get(':id')
    getTask(@Param('id') id : string){
        return this.taskService.getTask(id);
    }

    @Delete(':id')
    deleteTask(@Param('id') id : string){
        return this.taskService.deleteTask(id);
    }

    @Get()
    getAllTasks(){
        return this.taskService.getAllTasks();
    }

    @Post()
    createTask(@Body() createTaskDto : CreateTaskDto){
        return this.taskService.createTask(createTaskDto);
    }
}
