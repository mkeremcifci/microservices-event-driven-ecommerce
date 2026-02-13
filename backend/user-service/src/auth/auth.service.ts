import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) {}

    async login(email: string, password: string) {
        const user = await this.usersService.findOneByEmail(email);

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            throw new UnauthorizedException('Invalid credentials(password incorrect)');
        }

        const payload = { email: user.email, sub: user.id };

        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
    async register(createUserDto: CreateUserDto){
        const { email, password } = createUserDto;
        const existingUser = await this.usersService.findOneByEmail(email)
        if(existingUser){
            throw new ConflictException('Email already in use');
        }

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        
        const newUser = await this.usersService.create({
            ...createUserDto,
            password: hashedPassword,
        })

        const { password: _, ...result } = newUser;
        return result;
    }
}
