import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'database',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'nest-auth',
      // entities: [],
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
})
export class AppModule {}
