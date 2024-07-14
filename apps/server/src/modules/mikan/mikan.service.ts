import { MIKAN_RSS_URL } from "@/constants/mikan.constant";
import { AnalyserService } from "@/modules/analyser/analyser.service";
import { BangumiService } from "@/modules/bangumi/bangumi.service";
import { SettingService } from "@/modules/setting/setting.service";
import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { Interval } from "@nestjs/schedule";
import RssParser from "rss-parser";
import { EpisodeService } from "../episode/episode.service";

@Injectable()
export class MikanService implements OnModuleInit {
	private readonly logger = new Logger(MikanService.name);
	private readonly rssParser = new RssParser();
	constructor(
		private readonly settingService: SettingService,
		private readonly analyserService: AnalyserService,
		private readonly bangumiService: BangumiService,
		private readonly episodeService: EpisodeService,
	) {}

	onModuleInit() {
		this.fetchRss();
	}

	@Interval("MIKAN_RSS", 1000 * 60 * 2)
	fetchRss() {
		this.logger.log("Fetching mikan rss");
		this.rssParser.parseURL(this._getRssUrl(), (_, feed) => {
			this._processRss(feed.items);
		});
	}

	private _getRssUrl() {
		const mikanToken = this.settingService.get().mikan.token;
		if (!mikanToken) throw new Error("Mikan token not setted");
		return `${MIKAN_RSS_URL}${mikanToken}`;
	}

	private async _processRss(items: RssParser.Item[]) {
		for (const item of items) {
			if (!item.title) continue;
			try {
				this.logger.debug(`Analyse ${item.title}`);
				const { episodeNum, ...bangumiInput } = this.analyserService.mikanTitle(
					item.title,
				);
				const bangumi = await this.bangumiService.findOrCreate(
					{
						originName: bangumiInput.originName,
						season: bangumiInput.season,
					},
					bangumiInput,
					item.link!,
				);
				await this.episodeService.findOrCreate(
					{
						bangumiId: bangumi.id,
						num: episodeNum,
					},
					{
						bangumiId: bangumi.id,
						num: episodeNum,
						torrent: item.enclosure!.url,
					},
				);
			} catch (e) {
				this.logger.error(e);
			}
		}
	}
}
