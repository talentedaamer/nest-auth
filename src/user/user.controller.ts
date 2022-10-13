import {
  Body,
  ClassSerializerInterceptor, ConflictException,
  Controller, Delete,
  Get,
  Param,
  Post, Put, Query,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { UserService } from "./user.service";
import * as bcrypt from 'bcryptjs';
import { User } from "./entities/user.entity";
import {CreateUserDto} from "./dto/create-user.dto";
import {UpdateUserDto} from "./dto/update-user.dto";

@UseInterceptors(ClassSerializerInterceptor)
// @UseGuards(AuthGuard)
@Controller('users')
export class UserController {
  
  constructor(
    private userService: UserService
  ) {
  }
  
  @Get()
  async all( @Query('page') page = 1): Promise<User[]> {
    return await this.userService.all();
  }
  
  @Post()
  async create( @Body() body: CreateUserDto ): Promise<User> {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(body.password, salt);
    const { user_name, email, role_id, ...data } = body;

    if ( user_name && await this.isUsernameExists(body) ) {
      throw new ConflictException(`username already exists`);
    }

    if ( email && await this.isEmailExists(body) ) {
      throw new ConflictException(`email already exists`);
    }

    return this.userService.create({
      ...body,
      password: hash,
      // role: {
      //   id: role_id
      // }
    })
  }

  @Get( ':id')
  async get( @Param('id') id: number ) {
    return this.userService.findOne({id: id});
  }

  @Put(':id')
  async update( @Param('id') id: number, @Body() body: UpdateUserDto ) {
    const { password, role_id, ...data } = body;

    if ( body.user_name && await this.isUsernameExists(body) ) {
      throw new ConflictException(`username already exists`);
    }

    if ( body.email && await this.isEmailExists(body) ) {
      throw new ConflictException(`email already exists`);
    }

    await this.userService.update(id, {
      ...data,
      // role: {
      //   id: role_id // fix removing of role id when not provided in update
      // }
    });

    return this.userService.findOne({id: id});
  }

  @Delete(':id')
  async delete( @Param('id') id: number ) {
    return this.userService.delete(id);
  }

  async isUsernameExists( createUserDto: CreateUserDto | UpdateUserDto ): Promise<any> {
    const usernameExists = await this.userService.findOne({
      user_name: createUserDto.user_name
    });
    return !!(usernameExists);
  }

  async isEmailExists( createUserDto: CreateUserDto | UpdateUserDto ): Promise<any> {
    const emailExists = await this.userService.findOne({
      email: createUserDto.email
    });
    return !!(emailExists);
  }
}
