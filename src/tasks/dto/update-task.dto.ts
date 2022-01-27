import {TaskStatus} from "../task.mode";
import {IsEnum} from "class-validator";

export class UpdateTaskDto{
    @IsEnum(TaskStatus)
    status: TaskStatus;
}