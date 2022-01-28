import {EntityRepository, Repository} from "typeorm";
import {Task} from "./task.entity";
import {TaskStatus} from "./task.enums";
import {CreateTaskDto} from "./dto/create-task.dto";
import {GetTasksFilterDto} from "./dto/get-tasks-filter.dto";

@EntityRepository(Task)
export class TasksRepository extends Repository<Task>{
    async createTask(createTaskDto: CreateTaskDto){
        const {title, description} = createTaskDto;
        const task = this.create({
            status: TaskStatus.OPEN,
            title, description
        });
        await this.save(task);
        return task;
    }

    async getTasks(filterDto: GetTasksFilterDto){
        const {status, search} = filterDto;
        const query = this.createQueryBuilder('task');
        if (status) {
            query.andWhere('task.status = :status', {status})
        }
        if(search){
            query.andWhere(
                'LOWER(task.title) LIKE LOWER(:search) or LOWER(task.description) LIKE LOWER(:search)',
                {search: `%${search}%`}
            );
        }
        return await query.getMany();
    }
}