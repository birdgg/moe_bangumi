import { Controller, Get, Body, Patch, Param } from '@nestjs/common';
import { SettingService } from './setting.service';
import { Setting } from 'src/interfaces/setting.interface';

@Controller('setting')
export class SettingController {
  constructor(private readonly settingService: SettingService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    // return this.settingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() setting: Setting) {
    // return this.settingService.update(+id, setting);
  }
}
