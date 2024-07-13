import { Module } from '@nestjs/common';
import { BangumiController } from '@/modules/bangumi/bangumi.contrller';
import { BangumiService } from './bangumi.service';

@Module({
  controllers: [BangumiController],
  providers: [BangumiService],
  exports: [BangumiService],
})
export class BangumiModule {}
