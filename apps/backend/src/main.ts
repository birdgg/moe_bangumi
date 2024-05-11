import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaClientExceptionFilter } from 'nestjs-prisma';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));
  app.setGlobalPrefix('api');
  const config = new DocumentBuilder()
    .setTitle('Moe Bangumi')
    .setDescription("The backend for Moe Bangumi's project")
    .setVersion('1.0')
    .addTag('bangumi')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);
  await app.listen(3200);
}
bootstrap();
