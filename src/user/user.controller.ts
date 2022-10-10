import {
  Body,
  ClassSerializerInterceptor,
  Controller, Delete,
  Get,
  Param,
  Post, Put, Query,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { UserService } from "./user.service";
import * as bcrypt from 'bcryptjs';

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard)
@Controller('users')
export class UserController {
  
  constructor(
    private userService: UserService
  ) {
  }
  
  @Get()
  async all( @Query('page') page = 1): Promise<User[]> {
    return await this.userService.paginate(page);
  }
  
  @Post()
  async create( @Body() body: UserCreateDto ): Promise<User> {
    const password = await bcrypt.hash(body.password, 12);
    const { role_id, ...data } = body;
    
    return this.userService.create({
      ...data,
      password: password,
      role: {
        id: role_id
      }
    })
  }
  
  @Get( ':id')
  async get( @Param('id') id: number ) {
    return this.userService.findOne({id: id});
  }
  
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() body: UserUpdateDto
  ) {
    const { role_id, ...data } = body;
    
    await this.userService.update(id, {
      ...data,
      role: {
        id: role_id
      }
    });
    
    return this.userService.findOne({id: id});
  }
  
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.userService.delete(id);
  }
}
