import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {TaskStatus} from "./task.enums";
import {User} from "../auth/user.entity";
import {Exclude} from "class-transformer";

@Entity()
export class Task {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    status: TaskStatus;

    @ManyToOne(type => User, user => user.tasks, {eager: true})
    @Exclude({toPlainOnly: true})
    user: User;


}