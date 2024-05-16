import { parse } from 'node:path';

export function getPathLevel(path: string): number {
  const { dir } = parse(path);
  return dir.split('/').length;
}
