import { MIKAN_RSS_URL } from "@/constants/mikan.constant";
import type { AnalyserService } from "@/modules/analyser/analyser.service";
import type { BangumiService } from "@/modules/bangumi/bangumi.service";
import type { SettingService } from "@/modules/setting/setting.service";
import { Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import RssParser from "rss-parser";
import type { PosterService } from "../poster/poster.service";

@Injectable()
export class MikanService {
	private readonly logger = new Logger(MikanService.name);
	private readonly rssParser = new RssParser();
	constructor(
		private readonly settingService: SettingService,
		private readonly analyserService: AnalyserService,
		private readonly bangumiService: BangumiService,
		private posterService: PosterService,
	) {}

	@Cron(
		process.env.NODE_ENV === "development"
			? CronExpression.EVERY_5_MINUTES
			: CronExpression.EVERY_HOUR,
		{
			name: "MIKAN_RSS",
			disabled: false,
		},
	)
	fetchRss() {
		this.logger.debug("Fetching Mikan RSS");
		this.rssParser.parseURL(this._getRssUrl(), (_, feed) => {
			this._processRss(feed.items);
		});
	}

	// TODO: init onModuleInit
	private _getRssUrl() {
		const mikanToken = this.settingService.get().general.mikanToken;
		if (!mikanToken) throw new Error("Mikan token not setted");
		return `${MIKAN_RSS_URL}${mikanToken}`;
	}

	private async _processRss(items: RssParser.Item[]) {
		for (const item of items) {
			if (!item.title) continue;
			try {
				const { episode, ...bangumiInput } = this.analyserService.mikanTitle(
					item.title,
				);
				const bangumi = await this.bangumiService.findByNameSeason({
					originName: bangumiInput.originName,
					season: bangumiInput.season!,
				});

				if (!bangumi) {
					const poster = await this.posterService.getFromMikan(item.link!);
					await this.bangumiService.create({ ...bangumiInput, poster });
				}
				// TODO: download epoisode
			} catch (e) {
				this.logger.error(e);
			}
		}
	}
}
