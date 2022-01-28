import {TaskStatus} from "../task.enums";
import {IsEnum} from "class-validator";

export class UpdateTaskDto{
    @IsEnum(TaskStatus)
    status: TaskStatus;
}