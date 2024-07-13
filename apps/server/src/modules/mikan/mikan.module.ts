import { Module } from '@nestjs/common';
import { BangumiModule } from '../bangumi/bangumi.module';
import { PosterModule } from '../poster/poster.module';
import { MikanService } from './mikan.service';

@Module({
  imports: [BangumiModule, PosterModule],
  providers: [MikanService],
  exports: [MikanService],
})
export class MikanModule {}
