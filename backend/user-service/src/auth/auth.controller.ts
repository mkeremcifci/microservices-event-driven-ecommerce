import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dtos/create-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/register')
    async register(@Body() body: CreateUserDto) {
        return this.authService.register(body);
    }

    @Post('/login')
    async login(@Body() body: { email: string; password: string }) {
        const { email, password } = body;
        return this.authService.login(email, password);
    }
}