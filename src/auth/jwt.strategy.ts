import {Injectable, UnauthorizedException} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {ExtractJwt, Strategy} from "passport-jwt";
import {UsersRepository} from "./users.repository";
import {InjectRepository} from "@nestjs/typeorm";
import {JwtPayload} from "./auth.types";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(UsersRepository)
        private usersRepository: UsersRepository) {
        super({
            secretOrKey: 'test',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        })
    }

    async validate(payload: JwtPayload) {
        const {username} = payload;
        const user = await this.usersRepository.findOne({username});
        if (user)
            return user;
        throw new UnauthorizedException();
    }
}