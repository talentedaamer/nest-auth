import {
    BadRequestException,
    Body, ClassSerializerInterceptor,
    Controller,
    Get,
    NotFoundException,
    Post,
    Req,
    Res, UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {UserService} from "../user/user.service";
// import {RegisterDto} from "./dto/register.dto";
// import {JwtService} from "@nestjs/jwt";
// import {Request, Response} from "express";
// import {AuthGuard} from "./auth.guard";
// import * as bcrypt from 'bcryptjs';

@UseInterceptors(ClassSerializerInterceptor)
@Controller()
export class AuthController {

    constructor(
        // private userService: UserService,
        // private jwtService: JwtService
    ) {}

    // @Post('register')
    // async register( @Body() body: RegisterDto ) {
    //
    //     if ( body.password !== body.password_confirm ) {
    //         throw new BadRequestException('Password mismatch');
    //     }
    //
    //     const salt = await bcrypt.genSalt(10);
    //     const hash = await bcrypt.hash(body.password, salt);
    //
    //     return this.userService.create({
    //         first_name: body.first_name,
    //         last_name: body.last_name,
    //         email: body.email,
    //         password: hash,
    //         role: {
    //             id: 2
    //         }
    //     });
    // }
    //
    // @Post('login')
    // async login(
    //     @Body('email') email: string,
    //     @Body('password') password: string,
    //     @Res( {passthrough: true}) response: Response
    // ) {
    //     const user = await this.userService.findOneByEmail(email);
    //
    //     if ( !user ) {
    //         throw new NotFoundException('User not found');
    //     }
    //
    //     if ( ! await bcrypt.compare(password, user.password) ) {
    //         throw new BadRequestException('Invalid credentials');
    //     }
    //
    //     const jwt = await this.jwtService.signAsync({
    //         id: user.id
    //     })
    //
    //     response.cookie('jwt', jwt, { httpOnly: true})
    //
    //     return user;
    // }
    //
    // @UseGuards(AuthGuard)
    // @Get('user')
    // async user( @Req() request: Request ) {
    //     const cookie = request.cookies['jwt'];
    //
    //     const data = await this.jwtService.verifyAsync(cookie);
    //
    //     return this.userService.findOne( {id: data['id']});
    // }
    //
    // @UseGuards(AuthGuard)
    // @Post('logout')
    // async logout( @Res({passthrough: true}) response: Response ) {
    //     response.clearCookie('jwt')
    //
    //     return {
    //         message: 'success'
    //     }
    // }
}
