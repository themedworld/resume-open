import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

  app.use(cors({
    origin: 'http://localhost:3000', 
    credentials: true,
  }));
  app.setGlobalPrefix('api/v1')
  await app.listen(3001);
}
bootstrap();