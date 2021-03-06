import {EntityRepository, Repository} from "typeorm";
import {Task} from "./task.entity";
import {TaskStatus} from "./task.enums";
import {CreateTaskDto} from "./dto/create-task.dto";
import {GetTasksFilterDto} from "./dto/get-tasks-filter.dto";
import {User} from "../auth/user.entity";
import {InternalServerErrorException, Logger} from "@nestjs/common";

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
    private logger = new Logger('TasksRepository');

    async createTask(createTaskDto: CreateTaskDto, user: User) {
        const {title, description} = createTaskDto;
        const task = this.create({
            status: TaskStatus.OPEN,
            title, description, user
        });
        await this.save(task);
        return task;
    }

    async getTasks(filterDto: GetTasksFilterDto, user: User) {
        const {status, search} = filterDto;
        const query = await this.createQueryBuilder('task'); //.leftJoinAndSelect('task.user', 'user')
        query.where({user});

        if (status) {
            query.andWhere('task.status = :status', {status})
        }
        if (search) {
            query.andWhere(
                '(LOWER(task.title) LIKE LOWER(:search) or LOWER(task.description) LIKE LOWER(:search))',
                {search: `%${search}%`}
            );
        }

        try {
            return await query.getMany();
        } catch (e) {
            this.logger.error(`Failed to get tasks for user "${user.username}". Filters: ${JSON.stringify(filterDto)}`, e.stack)
            throw new InternalServerErrorException();
        }
    }
}