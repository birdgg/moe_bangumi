import fs from 'node:fs';
import path from 'node:path';
import openapiTS, { astToString } from 'openapi-typescript';

const target = path.resolve('../web/queries/generatedApi.ts');

(async () => {
  const ast = await openapiTS(new URL('http://localhost:3200/api-json'));
  const contents = astToString(ast);
  fs.writeFileSync(target, contents);
  console.log(`Moe bangumi api generated in ${target}`);
})();
