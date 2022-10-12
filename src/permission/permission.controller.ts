import { Body, ConflictException, Controller, Delete, Get, NotFoundException, Param, Post, Put } from "@nestjs/common";
import {PermissionService} from "./permission.service";
import {Permission} from "./entities/permission.entity";
import { CreatePermissionDto } from "./dto/create-permission.dto";
import { UpdatePermissionDto } from "./dto/update-permission.dto";

@Controller('permissions')
export class PermissionController {
    
    constructor(
        private permissionService: PermissionService
    ) {}
    
    @Get()
    async all(): Promise<Permission[]> {
        return await this.permissionService.all();
    }
    
    @Post()
    async create( @Body() body: CreatePermissionDto ): Promise<Permission> {
        if ( await this.isPermissionExists(body) ) {
            throw new ConflictException(`permission already exists`);
        }
        
        return this.permissionService.create(body);
    }
    
    @Get( ':id')
    async get( @Param('id') id: number ) {
      const foundPermission = await this.permissionService.findOne(id);
      
      if (!foundPermission) {
          throw new NotFoundException(`permission not found`)
      }

      return foundPermission;
    }

    @Put(':id')
    async update( @Param('id') id: number, @Body() body: UpdatePermissionDto ) {
        if (! await this.hasFoundPermission(id) ) {
            throw new NotFoundException(`permission not found with #${id}`)
        }
    
        if ( await this.isPermissionExists(body) ) {
            throw new ConflictException(`permission already exists`);
        }

        await this.permissionService.update(id, body);
        
        return this.permissionService.findOne(id);
    }

    @Delete(':id')
    async delete( @Param('id' ) id: number ) {
        if (! await this.hasFoundPermission(id) ) {
            throw new NotFoundException(`permission not found with #${id}`)
        }
        
        return this.permissionService.delete(id);
    }
    
    async isPermissionExists(createPermissionDto: CreatePermissionDto): Promise<any> {
        const { name } = createPermissionDto;
        const permissionExists = await this.permissionService.findByName(name);
        if (permissionExists) {
            return true;
        }
        
        return false;
    }
    
    async hasFoundPermission(id: number): Promise<any> {
        const foundPermission = await this.permissionService.findOne(id);
    
        if (foundPermission) {
            return true
        }
        
        return false;
    }
}
