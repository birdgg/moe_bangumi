import { Injectable, OnModuleInit } from '@nestjs/common';
import { readFileSync, writeFileSync } from 'node:fs';
import { LOG_FILE } from './constant';

@Injectable()
export class LogService implements OnModuleInit {
  constructor() {}

  onModuleInit() {
    writeFileSync(LOG_FILE, '', 'utf-8');
  }

  get() {
    return readFileSync(LOG_FILE, 'utf-8');
  }
}
