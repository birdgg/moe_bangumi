import { Injectable } from '@nestjs/common';
import { rawParser } from './analysers/rawParser';

@Injectable()
export class AnalyserService {
  mikanTitle(title: string) {
    return rawParser(title);
  }
}
