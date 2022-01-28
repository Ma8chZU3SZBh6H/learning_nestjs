import {Injectable, NotFoundException} from '@nestjs/common';
import {TaskStatus} from "./task.enums";
import {CreateTaskDto} from "./dto/create-task.dto";
import {TasksRepository} from "./tasks.repository";
import {InjectRepository} from "@nestjs/typeorm";
import {GetTasksFilterDto} from "./dto/get-tasks-filter.dto";
import {Like, } from "typeorm";
import {UpdateTaskDto} from "./dto/update-task.dto";

@Injectable()
export class TasksService {

    constructor(
        @InjectRepository(TasksRepository)
        private taskRepository : TasksRepository
    ) {}

    getTasks(getTasksFitlerDto : GetTasksFilterDto){
        return this.taskRepository.getTasks(getTasksFitlerDto);
    }

    async getTask(id:string){
        const task = await this.taskRepository.findOne(id);
        if(task)
            return task;
        throw new NotFoundException();
    }

    createTask(createTaskDto : CreateTaskDto){
        return this.taskRepository.createTask(createTaskDto);
    }

    async deleteTask(id:string){
        const result = await this.taskRepository.delete(id);
        if (result.affected)
            return result.affected;
        throw new NotFoundException();
    }

    async updateTask(id : string, updatedTaskDto : UpdateTaskDto){
        const {status} = updatedTaskDto;
        let task = await this.getTask(id);
        task.status = status;
        await this.taskRepository.save(task);
        return task;
    }
}
