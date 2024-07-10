import { INestApplication } from "@nestjs/common";
import { apiReference } from '@scalar/nestjs-api-reference'
import { generateOpenApi } from '@ts-rest/open-api';
import { contract } from '@repo/shared-api';

export function setup(app: INestApplication) {
  const document = generateOpenApi(contract, {
    info: {
      title: 'Moe Bangumi API',
      version: '1.0.0',
    },
  }, {
    setOperationId: true
  });
  app.use(
    '/swagger',
    apiReference({
      spec: {
        content: document,
      },
    }),
  )
}