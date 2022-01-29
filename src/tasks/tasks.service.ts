import {Injectable, NotFoundException} from '@nestjs/common';
import {CreateTaskDto} from "./dto/create-task.dto";
import {TasksRepository} from "./tasks.repository";
import {InjectRepository} from "@nestjs/typeorm";
import {GetTasksFilterDto} from "./dto/get-tasks-filter.dto";
import {UpdateTaskDto} from "./dto/update-task.dto";
import {User} from "../auth/user.entity";

@Injectable()
export class TasksService {

    constructor(
        @InjectRepository(TasksRepository)
        private taskRepository: TasksRepository
    ) {
    }

    getTasks(getTasksFilterDto: GetTasksFilterDto, user: User) {
        return this.taskRepository.getTasks(getTasksFilterDto, user);
    }

    async getTask(id: string) {
        const task = await this.taskRepository.findOne(id);
        if (task)
            return task;
        throw new NotFoundException();
    }

    createTask(createTaskDto: CreateTaskDto, user: User) {
        return this.taskRepository.createTask(createTaskDto, user);
    }

    async deleteTask(id: string) {
        const result = await this.taskRepository.delete(id);
        if (result.affected)
            return result.affected;
        throw new NotFoundException();
    }

    async updateTask(id: string, updatedTaskDto: UpdateTaskDto) {
        const {status} = updatedTaskDto;
        let task = await this.getTask(id);
        task.status = status;
        await this.taskRepository.save(task);
        return task;
    }
}
