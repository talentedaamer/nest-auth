import { Injectable } from '@nestjs/common';
import { AbstractService } from "../common/services/abstract.service.ts";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserService extends AbstractService {
  
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {
    super(userRepository);
  }
  
  async findOne(condition): Promise<User> {
    return await this.userRepository.findOne({where: condition});
  }
}
