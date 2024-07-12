import { Module } from '@nestjs/common';
import { BangumiModule } from '../bangumi/bangumi.module';
import { MikanService } from './mikan.service';
import { PosterModule } from '../poster/poster.module';

@Module({
  imports: [BangumiModule, PosterModule],
  providers: [MikanService],
  exports: [MikanService],
})
export class MikanModule {}
