import { IsBoolean, IsDate, IsEmail, IsNotEmpty, IsOptional } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty()
  first_name: string;
  
  @IsNotEmpty()
  last_name: string;
  
  @IsNotEmpty()
  user_name: string;
  
  @IsNotEmpty()
  @IsEmail()
  email: string;
  
  @IsNotEmpty()
  password: string;
  
  @IsBoolean()
  is_active: boolean;
  
  @IsOptional()
  @IsDate()
  created_at: Date;
  
  @IsOptional()
  @IsDate()
  updated_at: Date;
  
  @IsNotEmpty()
  role_id: number
}