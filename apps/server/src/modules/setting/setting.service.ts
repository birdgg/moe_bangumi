import * as fs from 'node:fs';
import * as path from 'node:path';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Setting } from '@repo/shared-api';

const DEFAULT_SETTING: Setting = {
	general: {
		mikanToken: '',
	},
	downloader: {
		host: '',
		username: 'admin',
		password: 'adminadmin',
		savePath: '/downloads',
	},
};

@Injectable()
export class SettingService implements OnModuleInit {
	private readonly logger = new Logger(SettingService.name);
	private readonly FILE = `${process.cwd()}/data/setting.json`;
	private setting?: Setting;

	onModuleInit() {
		this._load();
	}

	get(): Setting {
		return this.setting
	}

	update(setting: Partial<Setting>) {
		const newSetting = { ...this.setting, ...setting };
		this.setting = { ...this.setting, ...setting } as Setting;
		fs.writeFileSync(this.FILE, JSON.stringify(newSetting));
		return newSetting;
	}

	private _load() {
		const filePath = path.dirname(this.FILE);
		if (!fs.existsSync(filePath)) {
			fs.mkdirSync(filePath, { recursive: true });
			fs.writeFileSync(this.FILE, JSON.stringify(DEFAULT_SETTING));
		}
		const data = fs.readFileSync(this.FILE, 'utf-8');
		this.setting = JSON.parse(data) as Setting;
	}
}
