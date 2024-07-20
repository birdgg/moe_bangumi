import * as fs from "node:fs";
import { join } from "node:path";
import { DATA_DIR } from "@/constants/path.constant";
import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { Setting } from "@repo/api/setting";
import { EVENT_SETTING_UPDATED } from "./setting.constant";

const DEFAULT_SETTING: Setting = {
	mikan: {
		token: "",
	},
	downloader: {
		host: "http://localhost:8989",
		username: "admin",
		password: "adminadmin",
		savePath: "/downloads",
	},
};

@Injectable()
export class SettingService {
	private readonly logger = new Logger(SettingService.name);
	private readonly FILE = join(DATA_DIR, "setting.json");
	private setting!: Setting;

	constructor(private eventEmitter: EventEmitter2) {}

	load() {
		this.loadFile();
	}

	get(): Setting {
		return this.setting;
	}

	getBy(key: keyof Setting) {
		return this.setting[key];
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
		try {
			this.saveFile(newSetting);
			this.eventEmitter.emit(EVENT_SETTING_UPDATED, newSetting);
			return newSetting as Setting;
		} catch (e) {
			this.logger.error(e);
			throw new HttpException(
				"Failed to update setting",
				HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}

	private loadFile() {
		if (!fs.existsSync(this.FILE)) {
			fs.writeFileSync(this.FILE, JSON.stringify(DEFAULT_SETTING));
		}
		const data = fs.readFileSync(this.FILE, "utf-8");

		this.setting = JSON.parse(data) as Setting;
		this.logger.log("Load setting");
	}

	private saveFile(setting: Partial<Setting>) {
		fs.writeFileSync(this.FILE, JSON.stringify(setting));
	}
}
