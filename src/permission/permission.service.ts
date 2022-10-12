import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Permission} from "./entities/permission.entity";
import {Repository} from "typeorm";
import { AbstractService } from "../common/services/abstract.service.ts";

@Injectable()
export class PermissionService extends AbstractService {
    constructor(
        @InjectRepository(Permission)
        private readonly permissionRepository: Repository<Permission>
    ) {
        super(permissionRepository);
    }
    
    async findOne(id: number): Promise<any> {
        return await this.repository.findOne({
            where: {
                id,
            },
        });
    }
    
    async findByName(name: string): Promise<any> {
        return await this.repository.findOneBy({ name });
    }
}
