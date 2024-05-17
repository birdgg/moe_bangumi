import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { readFileSync, writeFileSync } from 'node:fs';
import { LOG_FILE } from './constant';

@Injectable()
export class LogService implements OnModuleInit {
  private logger = new Logger(LogService.name);
  constructor() {}

  onModuleInit() {
    this.clear();
  }

  get() {
    const a = readFileSync(LOG_FILE, 'utf-8');
    return a;
  }

  clear() {
    writeFileSync(LOG_FILE, '', 'utf-8');
    return '';
  }
}
