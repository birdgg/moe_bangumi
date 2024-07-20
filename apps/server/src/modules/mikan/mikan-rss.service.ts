import { ONE_DAY, TWO_HOURS } from "@/constants/date.constant";
import { isDev } from "@/constants/env.constant";
import { EVENT_SETTING_UPDATED } from "@/constants/event.constant";
import { JOB_MIKAN_RSS } from "@/constants/job.constant";
import { AnalyserService } from "@/modules/analyser/analyser.service";
import { BangumiService } from "@/modules/bangumi/bangumi.service";
import { MIKAN_RSS_URL } from "@/modules/mikan/mikan.constant";
import { SettingService } from "@/modules/setting/setting.service";
import { md5Hash } from "@/utils/crypto";
import { CACHE_MANAGER, Cache } from "@nestjs/cache-manager";
import { Inject, Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { Interval } from "@nestjs/schedule";
import RssParser from "rss-parser";
import { DownloaderService } from "../downloader/downloader.service";
import { EpisodeService } from "../episode/episode.service";
import type { SettingEventPayload } from "../setting/setting.types";

@Injectable()
export class MikanRssService implements OnModuleInit {
	private logger = new Logger(MikanRssService.name);
	private rssParser = new RssParser();
	constructor(
		@Inject(CACHE_MANAGER) private cache: Cache,
		private settingService: SettingService,
		private analyserService: AnalyserService,
		private bangumiService: BangumiService,
		private episodeService: EpisodeService,
		private downloaderService: DownloaderService,
	) {}

	onModuleInit() {
		isDev && setTimeout(() => this.fetchRss(), 2000);
	}

	@Interval(JOB_MIKAN_RSS, TWO_HOURS)
	intervalHandler() {
		this.fetchRss();
	}

	@OnEvent(EVENT_SETTING_UPDATED)
	settingChangeHandler(payload: SettingEventPayload) {
		if (payload.mikan?.token) this.fetchRss();
	}

	private fetchRss() {
		this.logger.debug(this.rssUrl, this.downloaderService.isEnabled);
		if (this.rssUrl === "") {
			return;
		}
		if (!this.downloaderService.isEnabled) {
			return;
		}
		this.logger.debug("Start fetch mikan rss");
		this.rssParser.parseURL(this.rssUrl, (_, feed) => {
			if (feed.items.length === 0) {
				this.logger.error("No items in mikan rss feed, check your token");
				return;
			}
			this.handleRss(feed.items);
		});
	}

	get rssUrl() {
		const mikanToken = this.settingService.getBy("mikan").token;
		if (!mikanToken) return "";
		return `${MIKAN_RSS_URL}${mikanToken}`;
	}

	private async handleRss(items: RssParser.Item[]) {
		for (const item of items) {
			if (!item.title) continue;
			const hashedTitle = md5Hash(item.title);
			const isCached = await this.cache.get(hashedTitle);
			if (isCached) continue;
			try {
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
				this.cache.set(hashedTitle, true, ONE_DAY / 1000);
				this.logger.log(
					`Add ${bangumi.originName} Season ${bangumi.season} Episode ${episodeNum}`,
				);
			} catch (e) {
				this.logger.error(e);
			}
		}
	}
}
