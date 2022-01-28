import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsersRepository} from "./users.repository";

@Module({
  imports: [
      TypeOrmModule.forFeature([UsersRepository])
  ],
  providers: [AuthService]
})
export class AuthModule {}
