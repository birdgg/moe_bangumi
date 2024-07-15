import * as fs from "node:fs";
import * as path from "node:path";
import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { Setting } from "@repo/api/setting";

const DEFAULT_SETTING: Setting = {
	mikan: {
		token: "IrNydFnGd1%2fZ56onK1aljQ%3d%3d",
	},
	downloader: {
		host: "http://localhost:8989",
		username: "admin",
		password: "adminadmin",
		savePath: "/downloads",
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
		return this.setting!;
	}

	/**
	 * make sure savePath always end with /
	 */
	getSavePath() {
		const savePath = this.get().downloader.savePath;
		return savePath.endsWith("/") ? savePath : `${savePath}/`;
	}

	update(setting: Partial<Setting>) {
		const newSetting = { ...this.setting, ...setting };
		this.setting = { ...this.setting, ...setting } as Setting;
		fs.writeFileSync(this.FILE, JSON.stringify(newSetting));
		return newSetting as Setting;
	}

	private _load() {
		const filePath = path.dirname(this.FILE);
		if (!fs.existsSync(this.FILE)) {
			fs.mkdirSync(filePath, { recursive: true });
			fs.writeFileSync(this.FILE, JSON.stringify(DEFAULT_SETTING));
		}
		const data = fs.readFileSync(this.FILE, "utf-8");

		this.setting = JSON.parse(data) as Setting;
		this.logger.log("Load setting");
	}
}
