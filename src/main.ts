import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

const logger = new Logger('Main');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  await app.listen(process.env['APP_PORT']);
}

bootstrap()
  .then(() => {
    logger.log(`Server is running on port: [${process.env['APP_PORT']}]`);
  })
  .catch((err) => {
    logger.log(`Error is occurred during initialization the server: [${err}]`);
  });
