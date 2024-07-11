import { Module } from '@nestjs/common';
import { BangumiModule } from '../bangumi/bangumi.module';
import { MikanService } from './mikan.service';

@Module({
	imports: [BangumiModule],
	providers: [MikanService],
	exports: [MikanService],
})
export class MikanModule {}
