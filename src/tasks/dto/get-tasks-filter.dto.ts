import {TaskStatus} from "../task.enums";
import {IsEnum, IsNotEmpty, IsOptional, IsString} from "class-validator";

export class GetTasksFilterDto{
    @IsOptional()
    @IsEnum(TaskStatus)
    status?: TaskStatus;

    @IsOptional()
    @IsString()
    search? : string;
}