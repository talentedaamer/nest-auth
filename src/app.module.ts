import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommonModule } from "./common/common.module";
import { RoleModule } from "./role/role.module";
import { PermissionModule } from "./permission/permission.module";

@Module({
  imports: [
    UserModule,
    RoleModule,
    PermissionModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'nest-auth',
      autoLoadEntities: true,
      synchronize: true,
    }),
    CommonModule,
  ],
})
export class AppModule {}
