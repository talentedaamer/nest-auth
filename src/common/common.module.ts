import { Module } from '@nestjs/common';
import { JwtModule } from "@nestjs/jwt";
// import { AbstractService } from './abstract.service';

@Module({
  imports: [
    CommonModule,
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  exports: [
    JwtModule,
  ],
  providers: [
    // AbstractService
  ]
})
export class CommonModule {}
