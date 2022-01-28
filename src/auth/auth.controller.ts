import {Body, Controller, Post} from '@nestjs/common';
import {AuthCredentialsDto} from "./dto/auth-credentials.dto";
import {AuthService} from "./auth.service";
import {InjectRepository} from "@nestjs/typeorm";

@Controller('auth')
export class AuthController {
    constructor(private authService : AuthService) {}

    @Post('/signup')
    signUp(@Body() authCredentialsDto:AuthCredentialsDto){
        return this.authService.signUp(authCredentialsDto);
    }

    @Post('/signin')
    signIn(@Body() authCredentialsDto:AuthCredentialsDto){
        return this.authService.signIn(authCredentialsDto);
    }
}
