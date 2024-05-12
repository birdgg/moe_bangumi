import { Injectable, OnModuleInit } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { Setting } from './interface';

const DEFAULT_SETTING: Setting = {
  program: {
    rssTime: 7200,
    renameTime: 60,
    webuiPort: 7892,
  },
  downloader: {
    host: 'qb:8989',
    username: 'admin',
    password: 'adminadmin',
    path: '/downloads/fanjv',
  },
};

@Injectable()
export class SettingService implements OnModuleInit {
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

  updateSetting(setting: Setting) {
    this.setting = setting;
    const file = path.join(this.PATH, this.FILE);
    fs.writeFileSync(file, JSON.stringify(setting));
  }
}
