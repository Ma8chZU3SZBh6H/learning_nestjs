import {Injectable} from '@nestjs/common';
import {Task, TaskStatus} from "./task.mode";
import {v4 as uuid} from 'uuid';
import {CreateTaskDto} from "./dto/create-task.dto";

@Injectable()
export class TasksService {
    private tasks : Task[] = [];

    getTask(id:string){
        return this.tasks.find(t=>t.id === id);
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
}
