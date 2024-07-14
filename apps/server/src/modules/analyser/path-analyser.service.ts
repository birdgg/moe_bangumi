import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { SettingService } from "../setting/setting.service";

@Injectable()
export class PathAnalyserService {
	constructor(private settingService: SettingService) {}

	getSavePath(
		episode: Prisma.EpisodeGetPayload<{ include: { bangumi: true } }>,
	) {
		const baseSavePath = this.settingService.get().downloader.savePath;
		const bangumiName = episode.bangumi.nameZh;
		const season = this.convertNumberToString(episode.bangumi.season);
		return `${baseSavePath}/${bangumiName}/Season ${season}`;
	}

	convertNumberToString(num: number) {
		return num > 10 ? `${num}` : `0${num}`;
	}
}
