import { Module } from '@nestjs/common';
import { SettingController } from './setting/setting.controller';
import { BangumisController } from './bangumi/bangumi.controller';
import { BangumisService } from './bangumi/bangumis.service';

@Module({
  controllers: [BangumisController, SettingController],
  providers: [BangumisService],
})
export class HttpModule {}
