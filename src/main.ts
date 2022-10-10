import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.setGlobalPrefix('api');
  
  // use dto validations
  app.useGlobalPipes( new ValidationPipe({
    whitelist: true,
    transform: true, // transform query and params from string -> number etc.
    forbidNonWhitelisted: true,
    transformOptions: {
      enableImplicitConversion: true
    }
  }));
  
  await app.listen(3000);
}
bootstrap();
