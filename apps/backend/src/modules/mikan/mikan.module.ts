import { Module } from '@nestjs/common';
import { MikanController } from './mikan.controller';
import { MikanService } from './mikan.service';

@Module({
  controllers: [MikanController],
  providers: [MikanService],
})
export class MikanModule {}
