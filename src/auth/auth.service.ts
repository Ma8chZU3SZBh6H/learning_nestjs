import {Injectable, UnauthorizedException} from '@nestjs/common';
import {UsersRepository} from "./users.repository";
import {InjectRepository} from "@nestjs/typeorm";
import {AuthCredentialsDto} from "./dto/auth-credentials.dto";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UsersRepository)
        private usersRepository : UsersRepository
    ) {}

    async signUp(authCredentialsDto:AuthCredentialsDto){
        return this.usersRepository.createUser(authCredentialsDto);
    }

    async signIn(authCredentialsDto:AuthCredentialsDto){
        const {username, password} = authCredentialsDto;
        const user = await this.usersRepository.findOne({username});
        if (user && (await bcrypt.compare(password, user.password)))
            return 'success';
        throw new UnauthorizedException('PLease check your login credentials');
    }
}