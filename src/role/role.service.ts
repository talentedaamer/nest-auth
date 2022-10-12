import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Role} from "./entities/role.entity";
import {Repository} from "typeorm";
import { AbstractService } from "../common/services/abstract.service.ts";

@Injectable()
export class RoleService extends AbstractService {
    
    constructor(
        @InjectRepository(Role)
        private readonly roleRepository: Repository<Role>
    ) {
        super(roleRepository);
    }
    
    async findOne(id: number): Promise<any> {
        return await this.repository.findOne({
            where: {
                id,
            },
            relations: ['permissions'],
        });
    }
    
    async findByName(name: string): Promise<any> {
        return await this.repository.findOneBy({ name });
    }
}
