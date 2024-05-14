import { Controller, Get, Body, Patch } from '@nestjs/common';
import { Setting, UpdateSettingDto } from './setting.entity';
import { ApiTags } from '@nestjs/swagger';
import { SettingService } from './setting.service';

@ApiTags('Setting')
@Controller('setting')
export class SettingController {
  constructor(private readonly settingService: SettingService) {}

  @Get()
  find(): Setting {
    return this.settingService.getSetting();
  }

  @Patch()
  update(@Body() setting: UpdateSettingDto) {
    return this.settingService.updateSetting(setting);
  }
}
