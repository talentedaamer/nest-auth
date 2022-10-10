import { Injectable, Param } from "@nestjs/common";
import { Repository } from "typeorm";

@Injectable()
export abstract class AbstractService {
  protected constructor(
    protected readonly repository: Repository<any>
  ) {}
  
  async all(): Promise<any> {
    return await this.repository.find();
  }
  
  async create(data): Promise<any> {
    return this.repository.save(data);
  }
  
  async update( id: number, data: any ): Promise<any> {
    return this.repository.update(id, data);
  }
  
  async delete(@Param('id') id: number): Promise<any> {
    return this.repository.delete(id);
  }
}
