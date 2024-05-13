import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { Setting, UpdateSettingDto } from './setting.entity';

const DEFAULT_SETTING: Setting = {
  program: {
    rssTime: 7200,
    renameTime: 60,
    mikanToken: '',
  },
  downloader: {
    host: 'qb:8989',
    username: 'admin',
    password: 'adminadmin',
    path: '/downloads/bangumi',
  },
};

@Injectable()
export class SettingService implements OnModuleInit {
  private readonly logger = new Logger(SettingService.name);
  private readonly PATH = `${process.cwd()}/config`;
  private readonly FILE = 'config.json';
  private setting: Setting;

  onModuleInit() {
    if (!fs.existsSync(this.PATH)) {
      fs.mkdirSync(this.PATH, { recursive: true });
    }
    const file = path.join(this.PATH, this.FILE);
    try {
      const data = fs.readFileSync(file, 'utf-8');
      this.setting = JSON.parse(data) as Setting;
    } catch (e) {
      // init config.json
      fs.writeFileSync(file, JSON.stringify(DEFAULT_SETTING));
      this.setting = DEFAULT_SETTING;
    }
  }

  getSetting() {
    return this.setting;
  }

  updateSetting(setting: Partial<Setting>) {
    const newSetting = { ...this.setting, ...setting };
    this.setting = { ...this.setting, ...setting };
    const file = path.join(this.PATH, this.FILE);
    fs.writeFileSync(file, JSON.stringify(newSetting));
    return newSetting;
  }
}
