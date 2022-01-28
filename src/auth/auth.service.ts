import {Injectable, UnauthorizedException} from '@nestjs/common';
import {UsersRepository} from "./users.repository";
import {InjectRepository} from "@nestjs/typeorm";
import {AuthCredentialsDto} from "./dto/auth-credentials.dto";
import * as bcrypt from 'bcrypt';
import {JwtService} from "@nestjs/jwt";
import {JwtPayload} from "./auth.types";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UsersRepository)
        private usersRepository: UsersRepository,
        private jwtService: JwtService
    ) {
    }

    async signUp(authCredentialsDto: AuthCredentialsDto) {
        return this.usersRepository.createUser(authCredentialsDto);
    }

    async signIn(authCredentialsDto: AuthCredentialsDto) {
        const {username, password} = authCredentialsDto;
        const user = await this.usersRepository.findOne({username});
        if (user && (await bcrypt.compare(password, user.password))) {
            const payload: JwtPayload = {username};
            const token = this.jwtService.sign(payload);
            return {token};
        }
        throw new UnauthorizedException('PLease check your login credentials');
    }
}
