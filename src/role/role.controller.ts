import {Body, Controller, Delete, Get, Param, Post, Put, Query} from '@nestjs/common';
import {RoleService} from "./role.service";
import {Role} from "./models/role.entity";
import {UserCreateDto} from "../user/models/user-create.dto";
import {User} from "../user/models/user.entity";
import * as bcrypt from "bcryptjs";
import {RoleCreateDto} from "./models/role-create.dto";
import {UserUpdateDto} from "../user/models/user-update.dto";


@Controller('roles')
export class RoleController {
    
    constructor(
        private roleService: RoleService
    ) {
    }
    
    @Get()
    async all(): Promise<Role[]> {
        return await this.roleService.all();
    }
    
    @Post()
    async create( @Body() body: RoleCreateDto ): Promise<Role> {
        const { name, permissions } = body;
        return this.roleService.create({
            name,
            permissions: permissions.map( id => ({id}))
        });
    }
    
    @Get( ':id')
    async get( @Param('id') id: number ) {
        return this.roleService.findOne({id: id});
    }
    
    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body('name') name: string,
        @Body('permissions') permissions: number[],
    ) {
        await this.roleService.update(id, {name});
        
        const role = await this.roleService.findOne({id: id});
        
        return this.roleService.create({
            ...role,
            permissions: permissions.map( id => ({id}))
        });
    }
    
    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.roleService.delete(id);
    }
}
