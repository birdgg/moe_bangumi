import { Module } from '@nestjs/common';
import { BangumisService } from './bangumis.service';
import { BangumisController } from './bangumis.controller';

@Module({
  controllers: [BangumisController],
  providers: [BangumisService],
})
export class BangumisModule {}
