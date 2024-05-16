import { Injectable, Logger, OnModuleDestroy } from '@nestjs/common';
import { readFileSync, writeFileSync } from 'node:fs';
import { LOG_FILE } from './constant';

@Injectable()
export class LogService implements OnModuleDestroy {
  private logger = new Logger(LogService.name);
  constructor() {}

  onModuleDestroy() {
    this.clear();
  }

  get() {
    return readFileSync(LOG_FILE, 'utf-8');
  }

  clear() {
    writeFileSync(LOG_FILE, '', 'utf-8');
    return '';
  }
}
