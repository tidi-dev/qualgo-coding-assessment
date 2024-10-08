import { swaggerConfig } from '@libs/configs';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      stopAtFirstError: true,
    }),
  );

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  swaggerConfig(app);

  await app.listen(3000);
}

bootstrap();
