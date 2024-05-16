import { INestApplication } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, createLogger } from 'nestjs-pretty-logger';
import { PrismaClientExceptionFilter } from 'nestjs-prisma';
import * as path from 'node:path';

const customLogger = createLogger({
  writeToFile: {
    loggerDir: path.resolve(process.cwd(), './logs'),
    stdoutFileFormat: 'stdout.log',
    errWriteToStdout: true,
  },
});
Logger.setLoggerInstance(customLogger);

customLogger.wrapAll();

export function configApp(app: INestApplication) {
  app.setGlobalPrefix('api');

  Logger.setLoggerInstance(customLogger);
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
