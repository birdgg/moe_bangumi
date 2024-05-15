import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configApp } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    bufferLogs: true,
    logger: false,
  });

  configApp(app);

  await app.listen(3200);
}
bootstrap();
