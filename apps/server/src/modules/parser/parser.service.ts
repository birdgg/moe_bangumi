import { Injectable } from '@nestjs/common';
import { rawParser } from './analyser/rawParser';

@Injectable()
export class AnalyserService {
  analyseMikanRssTitle(title: string) {
    return rawParser(title);
  }
}
