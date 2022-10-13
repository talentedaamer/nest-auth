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
    
    async findOne(condition): Promise<any> {
        return await this.repository.findOne({
            where: condition,
            relations: ['permissions'],
        });
    }
}
