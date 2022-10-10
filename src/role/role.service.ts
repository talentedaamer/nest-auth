import {Injectable, Param} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Role} from "./models/role.entity";
import {Repository} from "typeorm";
import {AbstractService} from "../common/abstract.service";

@Injectable()
export class RoleService extends AbstractService {
    
    constructor(
        @InjectRepository(Role) private readonly roleRepository: Repository<Role>
    ) {
        super(roleRepository);
    }
    
    async findOne( condition ): Promise<Role> {
        return await this.roleRepository.findOne({
            where: condition,
            relations: ['permissions']
        });
    }
}
