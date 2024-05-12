import { Controller, Get, Body, Patch } from '@nestjs/common';
import { SettingService } from './setting.service';
import { Setting } from 'src/interfaces/setting.interface';

@Controller('settings')
export class SettingController {
  constructor(private readonly settingService: SettingService) {}

  @Get()
  find() {
    return this.settingService.getSetting();
  }

  @Patch()
  update(@Body() setting: Setting) {
    return this.settingService.updateSetting(setting);
  }
}
