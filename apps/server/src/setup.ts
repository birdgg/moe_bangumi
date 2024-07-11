import { INestApplication } from '@nestjs/common';
import { apiReference } from '@scalar/nestjs-api-reference';
import { generateOpenApi } from '@ts-rest/open-api';
import { contract } from '@repo/shared-api';
import { HttpAdapterHost } from '@nestjs/core';
import { PrismaClientExceptionFilter } from 'nestjs-prisma';

export function setup(app: INestApplication) {
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  const document = generateOpenApi(
    contract,
    {
      info: {
        title: 'Moe Bangumi API',
        version: '1.0.0',
      },
    },
    {
      setOperationId: 'concatenated-path',
    },
  );
  app.use(
    '/swagger',
    apiReference({
      spec: {
        content: document,
      },
    }),
  );
}
