import { Body, Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
    
    @Get('/me')
    @UseGuards(AuthGuard('jwt'))
    getProfile(@Request() req) {
        return req.user;
    }

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