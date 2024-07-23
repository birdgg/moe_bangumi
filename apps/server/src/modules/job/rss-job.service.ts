import { TWO_HOURS } from "@/constants/date.constant";
import { JOB_RSS } from "@/constants/job.constant";
import { RssTorrent } from "@/types/torrent.type";
import { Injectable, Logger } from "@nestjs/common";
import { Interval } from "@nestjs/schedule";
import { AnalyserService } from "../analyser/analyser.service";
import { BangumiService } from "../database/bangumi.service";
import { RssItemService } from "../database/rssItem.service";
import { RssService } from "../rss/rss.service";

@Injectable()
export class RssJob {
	logger = new Logger(RssJob.name);
	constructor(
		private rssItem: RssItemService,
		private rss: RssService,
		private analyser: AnalyserService,
	) {}

	@Interval(JOB_RSS, TWO_HOURS)
	async handler() {
		const rssList = await this.rssItem.findAggregateRss();
		for (const { url } of rssList) {
			this.analyser.analyseRss(url);
		}
	}
}
