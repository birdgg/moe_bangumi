/* eslint-disable @typescript-eslint/no-var-requires */
const { generateApi } = require('swagger-typescript-api');
const path = require('path');

/* NOTE: all fields are optional expect one of `input`, `url`, `spec` */
generateApi({
  name: 'generatedApi.ts',
  output: path.resolve(process.cwd(), '../web/queries'),
  url: 'http://localhost:3200/api-json',
  httpClientType: 'fetch',
}).catch((e) => console.error(e));
