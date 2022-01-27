import {TaskStatus} from "../task.mode";

export class GetTasksFilterDto{
    status?: TaskStatus;
    search? : string;
}