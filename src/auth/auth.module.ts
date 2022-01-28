import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsersRepository} from "./users.repository";
import { AuthController } from './auth.controller';
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";

@Module({
  imports: [
      PassportModule.register({defaultStrategy: 'jwt'}),
      JwtModule.register({
          secret: 'test',
          signOptions: {
              expiresIn: 3600
          }
      }),
      TypeOrmModule.forFeature([UsersRepository])
  ],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
