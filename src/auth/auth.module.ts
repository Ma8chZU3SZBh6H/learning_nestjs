import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsersRepository} from "./users.repository";
import { AuthController } from './auth.controller';

@Module({
  imports: [
      TypeOrmModule.forFeature([UsersRepository])
  ],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
