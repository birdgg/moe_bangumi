import { padNumber } from "@/utils/string";
import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { SettingService } from "../setting/setting.service";

@Injectable()
export class PathAnalyserService {
	constructor(private settingService: SettingService) {}

	getSavePath(
		episode: Prisma.EpisodeGetPayload<{ include: { bangumi: true } }>,
	) {
		const baseSavePath = this.settingService.getSavePath();
		const bangumiName = episode.bangumi.nameZh;
		const season = padNumber(episode.bangumi.season);
		return `${baseSavePath}${bangumiName}/Season ${season}`;
	}
}
