import { Module } from '@nestjs/common';
import { SettingModule } from './modules/setting/setting.module';

@Module({
  imports: [SettingModule],
})
export class AppModule { }
