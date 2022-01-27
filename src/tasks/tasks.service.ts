import {Injectable} from '@nestjs/common';
import {Task, TaskStatus} from "./task.mode";
import {v4 as uuid} from 'uuid';
import {CreateTaskDto} from "./dto/create-task.dto";
import {UpdateTaskDto} from "./dto/update-task.dto";
import {GetTasksFilterDto} from "./dto/get-tasks-filter.dto";

@Injectable()
export class TasksService {
    private tasks : Task[] = [];

    getTask(id:string){
        return this.tasks.find(t=>t.id === id);
    }

    getTasksFilter(getTasksFilterDto : GetTasksFilterDto){
        const {status, search} = getTasksFilterDto;
        return this.tasks.filter(t=>
            (status ?  t.status === status : true) &&
            (search ? (t.title.includes(search) || t.description.includes(search)) : true)
        );
    }

    deleteTask(id : string){
        let task : Task = null;
        this.tasks = this.tasks.filter(t=>{
            if (t.id !== id){
                return true;
            }else{
                task = t;
                return false
            }
        });
        return task;
    }

    getAllTasks(){
        return this.tasks;
    }

    createTask(createTaskDto : CreateTaskDto){
        const {title, description} = createTaskDto;
        const task : Task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN
        }
        this.tasks.push(task);
        return task;
    }

    updateTask(id : string, updatedTaskDto : UpdateTaskDto){
        const {status} = updatedTaskDto;
        let task : Task = this.getTask(id);
        task.status = status;
        return task;
    }
}
