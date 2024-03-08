import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors({
    origin: 'http://localhost:3000', 
    credentials: true,
  }));
  app.setGlobalPrefix('api/v1')
  await app.listen(3001);
}
bootstrap();