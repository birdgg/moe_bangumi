import { INestApplication } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from 'nestjs-pino';
import { PrismaClientExceptionFilter } from 'nestjs-prisma';

export function configApp(app: INestApplication) {
  app.setGlobalPrefix('api');
  // pino
  app.useLogger(app.get(Logger));

  // prisma
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  // swagger
  const config = new DocumentBuilder()
    .setTitle('Moe Bangumi')
    .setDescription("The backend for Moe Bangumi's project")
    .setVersion('1.0')
    .addTag('bangumi')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);
}
