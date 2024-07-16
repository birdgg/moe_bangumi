import { ONE_DAY, ONE_HOUR, ONE_MINUTE } from "@/constants/date.constant";
import { AnalyserService } from "@/modules/analyser/analyser.service";
import { BangumiService } from "@/modules/bangumi/bangumi.service";
import { JOB_MIKAN_RSS, MIKAN_RSS_URL } from "@/modules/mikan/mikan.constant";
import { SettingService } from "@/modules/setting/setting.service";
import { md5Hash } from "@/utils/crypto";
import { CACHE_MANAGER, Cache } from "@nestjs/cache-manager";
import { Inject, Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { SchedulerRegistry } from "@nestjs/schedule";
import RssParser from "rss-parser";
import { EpisodeService } from "../episode/episode.service";
import { EVENT_SETTING_UPDATED } from "../setting/setting.constant";

@Injectable()
export class MikanService implements OnModuleInit {
	private readonly logger = new Logger(MikanService.name);
	private readonly rssParser = new RssParser();
	constructor(
		@Inject(CACHE_MANAGER) private cache: Cache,
		private readonly settingService: SettingService,
		private readonly analyserService: AnalyserService,
		private readonly bangumiService: BangumiService,
		private readonly episodeService: EpisodeService,
		private readonly schedulerRegistry: SchedulerRegistry,
	) {}

	onModuleInit() {
		if (this.getRssUrl() !== "") {
			this.startMikanRssJob();
		}
	}

	@OnEvent(EVENT_SETTING_UPDATED)
	handler() {
		this.logger.debug("Setting updated, restart mikan rss job");
		try {
			this.schedulerRegistry.deleteInterval(JOB_MIKAN_RSS);
		} finally {
			this.startMikanRssJob();
		}
	}

	private startMikanRssJob() {
		const interval =
			process.env.NODE_ENV === "development" ? ONE_MINUTE * 2 : ONE_HOUR * 2;
		this.fetchRss();
		this.schedulerRegistry.addInterval(JOB_MIKAN_RSS, () => {
			setInterval(this.fetchRss, interval);
		});
	}

	private fetchRss() {
		this.rssParser.parseURL(this.getRssUrl(), (_, feed) => {
			if (feed.items.length === 0) {
				this.logger.error("No items in mikan rss feed, check your token");
				return;
			}
			this.handleRss(feed.items);
		});
	}

	private getRssUrl() {
		const mikanToken = this.settingService.get().mikan.token;
		if (!mikanToken) throw new Error("Mikan token not setted");
		return `${MIKAN_RSS_URL}${mikanToken}`;
	}

	private async handleRss(items: RssParser.Item[]) {
		for (const item of items) {
			if (!item.title) continue;
			const hashedTitle = md5Hash(item.title);
			const isCached = await this.cache.get(hashedTitle);
			if (isCached) continue;
			try {
				this.logger.log(`Analyse ${item.title}`);
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
				this.logger.debug(
					`set cache for ${item.title} with key ${hashedTitle}`,
				);
				this.cache.set(hashedTitle, true, ONE_DAY / 1000);
			} catch (e) {
				this.logger.error(e);
			}
		}
	}
}
