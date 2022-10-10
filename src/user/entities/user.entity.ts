import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { IsBoolean, IsEmail } from "class-validator";
import { Exclude } from "class-transformer";

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
  
  @Exclude()
  @Column('varchar', { length: 40 })
  password: string;
  
  @IsEmail()
  @Column('varchar', { length: 40, unique: true })
  email: string;
  
  @Column('boolean', { default: false })
  is_active: boolean;
  
  @CreateDateColumn()
  created_at?: Date;
  
  @UpdateDateColumn()
  updated_at?: Date;
}
