import * as fs from "node:fs";
import { join } from "node:path";
import { EVENT_SETTING_UPDATED } from "@/constants/event.constant";
import { DATA_DIR } from "@/constants/path.constant";
import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { Setting } from "@repo/api/setting";
import { DEFAULT_SETTING } from "./setting.constant";

@Injectable()
export class SettingService {
	private readonly logger = new Logger(SettingService.name);
	private readonly FILE = join(DATA_DIR, "setting.json");
	private _setting = DEFAULT_SETTING;

	constructor(private eventEmitter: EventEmitter2) {}

	get setting() {
		return this._setting;
	}

	load() {
		this.logger.debug("load file");
		this.loadFile();
	}

	getBy<K extends keyof Setting>(key: K): Setting[K] {
		return this._setting[key];
	}

	/**
	 * make sure savePath always end with /
	 */
	getSavePath() {
		const savePath = this._setting.downloader.savePath;
		return savePath.endsWith("/") ? savePath : `${savePath}/`;
	}

	update(setting: Partial<Setting>) {
		const newSetting = { ...this._setting, ...setting };
		this._setting = { ...this._setting, ...setting } as Setting;
		try {
			this.saveFile(newSetting);
			this.eventEmitter.emit(EVENT_SETTING_UPDATED, setting);
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
			this._setting = DEFAULT_SETTING;
			return;
		}

		const data = fs.readFileSync(this.FILE, "utf-8");
		const setting = JSON.parse(data) as Setting;
		this.patchSetting(DEFAULT_SETTING, setting);

		this._setting = setting;
	}

	private saveFile(setting: Partial<Setting>) {
		fs.writeFileSync(this.FILE, JSON.stringify(setting));
	}

	private patchSetting(source: object, target: object) {
		for (const key in source) {
			if (!(key in target)) {
				target[key] = source[key];
			} else if (typeof target[key] === "object" && source[key] === "object") {
				target[key] = this.patchSetting(target[key], source[key]);
			}
		}
		return target;
	}
}
