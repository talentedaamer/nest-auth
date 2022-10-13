import {
    Body,
    ConflictException,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    Post,
    Put,
} from "@nestjs/common";
import {RoleService} from "./role.service";
import {Role} from "./entities/role.entity";
import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";

@Controller('roles')
export class RoleController {
    
    constructor(
        private roleService: RoleService
    ) {}
    
    @Get()
    async all(): Promise<Role[]> {
        return await this.roleService.all();
    }
    
    @Post()
    async create( @Body() body: CreateRoleDto ): Promise<Role> {
        const { name, permissions } = body;
        
        if ( await this.isRoleExists(body) ) {
            throw new ConflictException(`role already exists`);
        }
    
        return this.roleService.create({
            name,
            permissions: permissions && permissions.map( id => ({id}))
        });
    }

    @Get( ':id')
    async get( @Param('id') id: number ) {
        const foundRole = await this.roleService.findOne({id: id});
    
        if (!foundRole) {
            throw new NotFoundException(`role not found`)
        }
    
        return foundRole;
    }

    @Put(':id')
    async update( @Param('id') id: number, @Body() body: UpdateRoleDto ) {
        const { name, permissions } = body;
    
        if ( !await this.hasFoundRole(id) ) {
            throw new NotFoundException(`role not found with #${id}`)
        }
    
        if ( name && await this.isRoleExists(body) ) {
            throw new ConflictException(`role already exists`);
        }

        if ( name )
            await this.roleService.update(id, {name});

        const role = await this.roleService.findOne(id);

        return this.roleService.create({
            ...role,
            permissions: permissions && permissions.map( id => ({id}))
        });
    }

    @Delete(':id')
    async delete( @Param('id') id: number ) {
        if (! await this.hasFoundRole(id) ) {
            throw new NotFoundException(`role not found with #${id}`)
        }
    
        return this.roleService.delete(id);
    }
    
    async isRoleExists( createRoleDto: CreateRoleDto | UpdateRoleDto ): Promise<any> {
        const { name } = createRoleDto;
        const roleExists = await this.roleService.findOne({name: name});
        return !!(roleExists);
    }
    
    async hasFoundRole(id: number): Promise<any> {
        const foundRole = await this.roleService.findOne(id);
        
        return !!(foundRole);
    }
}
