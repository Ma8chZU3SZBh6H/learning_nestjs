import {TaskStatus} from "../task.mode";
import {IsEnum, IsNotEmpty, IsOptional, IsString} from "class-validator";

export class GetTasksFilterDto{
    @IsOptional()
    @IsEnum(TaskStatus)
    status?: TaskStatus;

    @IsOptional()
    @IsString()
    search? : string;
}