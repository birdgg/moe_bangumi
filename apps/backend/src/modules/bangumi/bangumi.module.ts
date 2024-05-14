import { Module } from '@nestjs/common';
import { BangumisController } from './bangumi.controller';
import { BangumisService } from './bangumis.service';

@Module({
  controllers: [BangumisController],
  providers: [BangumisService],
  exports: [BangumisService],
})
export class BangumiModule {}
