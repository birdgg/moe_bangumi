import { BangumiParseResult } from "@/types/bangumi.type";
import { padNumber } from "@/utils/string";
import { Injectable, Logger } from "@nestjs/common";
import { BangumiService } from "../database/bangumi.service";
import { PosterService } from "../poster/poster.service";
import { RssService } from "../rss/rss.service";
import { SettingService } from "../setting/setting.service";
import { rawParser } from "./parsers/raw-parser";

@Injectable()
export class AnalyserService {
	logger = new Logger(AnalyserService.name);
	constructor(
		private setting: SettingService,
		private rss: RssService,
		private bangumi: BangumiService,
		private poster: PosterService,
	) {}

	async analyseRss(url: string) {
		const torrents = await this.rss.request(url);
		const unaddBangumiTorrents = await this.bangumi.findUnaddBangumi(
			torrents,
			url,
		);

		if (unaddBangumiTorrents.length === 0) {
			this.logger.debug("No new bangumi found is rss");
			return;
		}

		const bulkBangumis: any[] = [];
		const needEpsCollect = this.setting.getBy("bangumiManager.epsComplete");

		for (const torrent of unaddBangumiTorrents) {
			const bangumi = rawParser(torrent.title);
			const poster = await this.poster.getFromMikan(torrent.homepage);
			bulkBangumis.push({ ...bangumi, poster, needEpsCollect });
		}

		this.bangumi.createMany(bulkBangumis);
	}

	getSavePath(bangumi: BangumiParseResult) {
		const baseSavePath = this.setting.getSavePath();
		const bangumiName = bangumi.nameZh;
		const season = padNumber(bangumi.season);
		return `${baseSavePath}${bangumiName}/Season ${season}`;
	}
}
