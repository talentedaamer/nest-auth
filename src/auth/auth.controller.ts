import {
    BadRequestException,
    Body, ClassSerializerInterceptor, ConflictException,
    Controller,
    Get,
    NotFoundException,
    Post,
    Req,
    Res, UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {UserService} from "../user/user.service";
import {RegisterDto} from "./dto/register.dto";
import {LoginDto} from "./dto/login.dto";
import {Request, Response} from "express";
import {AuthGuard} from "./auth.guard";
import * as bcrypt from 'bcryptjs';

@UseInterceptors(ClassSerializerInterceptor)
@Controller()
export class AuthController {

    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) {}

    @Post('register')
    async register( @Body() body: RegisterDto ) {
        const { password, confirm_password, ...data } = body;

        if ( password !== confirm_password ) {
            throw new BadRequestException('Password mismatch');
        }

        if ( body.user_name && await this.isUsernameExists(body) ) {
            throw new ConflictException(`username already exists`);
        }

        if ( body.email && await this.isEmailExists(body) ) {
            throw new ConflictException(`email already exists`);
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        return this.userService.create({
            ...data,
            password: hash,
            role: {
                id: 2
            }
        });
    }

    @Post('login')
    async login( @Body() body: LoginDto, @Res( {passthrough: true}) response: Response ) {

        const user = await this.userService.findOne({email: body.email});

        if ( !user ) {
            throw new NotFoundException('user not found');
        }

        if ( ! await bcrypt.compare(body.password, user.password) ) {
            throw new BadRequestException('invalid credentials');
        }

        const jwt = await this.jwtService.signAsync({
            id: user.id
        });

        response.cookie('jwt', jwt, { httpOnly: true})

        return user;
    }

    // @UseGuards(AuthGuard)
    @Get('user')
    async user( @Req() request: Request ) {
        const cookie = request.cookies['jwt'];

        const data = await this.jwtService.verifyAsync(cookie);

        return this.userService.findOne( {id: data['id']});
    }

    // @UseGuards(AuthGuard)
    @Post('logout')
    async logout( @Res({passthrough: true}) response: Response ) {
        response.clearCookie('jwt')

        return {
            message: 'success'
        }
    }

    async isUsernameExists( registerDto: RegisterDto | LoginDto ): Promise<any> {
        const usernameExists = await this.userService.findOne({
            user_name: registerDto.user_name
        });
        return !!(usernameExists);
    }

    async isEmailExists( createUserDto: RegisterDto | LoginDto ): Promise<any> {
        const emailExists = await this.userService.findOne({
            email: createUserDto.email
        });
        return !!(emailExists);
    }
}
