import { Injectable, ConflictException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {}

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
