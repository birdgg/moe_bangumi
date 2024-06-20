import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import * as fs from "fs";
import * as path from "path";
import type { Setting } from "./setting.entity";
import EventEmitter2 from "eventemitter2";
import { SETTING_CHANGED } from "./setting.constant";

const DEFAULT_SETTING: Setting = {
  program: {
    rssTime: 7200,
    renameTime: 60,
    mikanToken: "",
  },
  downloader: {
    host: "qb:8989",
    username: "admin",
    password: "adminadmin",
    path: "/downloads/bangumi",
  },
};

@Injectable()
export class SettingService implements OnModuleInit {
  private readonly logger = new Logger(SettingService.name);
  private readonly PATH = `${process.cwd()}/data`;
  private readonly FILE = "config.json";
  private setting: Setting;

  onModuleInit() {
    if (!fs.existsSync(this.PATH)) {
      fs.mkdirSync(this.PATH, { recursive: true });
    }
    const file = path.join(this.PATH, this.FILE);
    try {
      const data = fs.readFileSync(file, "utf-8");
      this.setting = JSON.parse(data) as Setting;
    } catch (e) {
      // init config.json
      fs.writeFileSync(file, JSON.stringify(DEFAULT_SETTING));
      this.setting = DEFAULT_SETTING;
    }
  }

  // constructor(private eventEmitter: EventEmitter2) {}

  getSetting() {
    return this.setting;
  }

  updateSetting(setting: Partial<Setting>) {
    const newSetting = { ...this.setting, ...setting };
    this.setting = { ...this.setting, ...setting };
    const file = path.join(this.PATH, this.FILE);
    fs.writeFileSync(file, JSON.stringify(newSetting));
    // this.eventEmitter.emit(SETTING_CHANGED, newSetting);
    return newSetting;
  }
}
