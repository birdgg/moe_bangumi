import { Module } from '@nestjs/common';
import { BangumiService } from './bangumi.service';
import { BangumiController } from '@/modules/bangumi/bangumi.contrller';

@Module({
  controllers: [BangumiController],
  providers: [BangumiService],
  exports: [BangumiService],
})
export class BangumiModule {}
