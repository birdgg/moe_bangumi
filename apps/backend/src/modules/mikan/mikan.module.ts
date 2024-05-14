import { Module } from '@nestjs/common';
import { MikanService } from './mikan.service';
import { BangumiModule } from '../bangumi/bangumi.module';
import { EpisodeModule } from '../episode/episode.module';

@Module({
  imports: [BangumiModule, EpisodeModule],
  providers: [MikanService],
})
export class MikanModule {}
