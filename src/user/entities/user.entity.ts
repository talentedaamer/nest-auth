import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { IsBoolean, IsEmail } from "class-validator";
import { Exclude } from "class-transformer";
import { Role } from "../../role/entities/role.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column('varchar', { length: 40 })
  first_name: string;
  
  @Column('varchar', { length: 40 })
  last_name?: string;
  
  @Column('varchar', { length: 40, unique: true })
  user_name: string;
  
  @IsEmail()
  @Column('varchar', { length: 40, unique: true })
  email: string;
  
  @Exclude()
  @Column('varchar', { length: 40 })
  password: string;
  
  @Column('boolean', { default: false })
  is_active: boolean;
  
  @CreateDateColumn()
  created_at?: Date;
  
  @UpdateDateColumn()
  updated_at?: Date;
  
  @ManyToOne( () => Role)
  @JoinColumn( { name: 'role_id' })
  role: Role
}
