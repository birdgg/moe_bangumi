import { Injectable } from '@nestjs/common';
import { rawParser } from './analysers/rawParser';

@Injectable()
export class AnalyserService {
  // TODO: we can cache analyse result for a day
  mikanTitle(title: string) {
    return rawParser(title);
  }
}
