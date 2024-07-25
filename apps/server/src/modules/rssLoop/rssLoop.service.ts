import { TWO_HOURS } from "@/constants/date.constant";
import { JOB_RSS } from "@/constants/job.constant";
import { RssItemService } from "@/processors/database/rssItem.service";
import { TorrentService } from "@/processors/database/torrent.service";
import { RssService } from "@/processors/rss/rss.service";
import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { Interval } from "@nestjs/schedule";
import { AnalyserService } from "../analyser/analyser.service";
import { DownloaderService } from "../downloader/downloader.service";

@Injectable()
export class RssLoopService implements OnModuleInit {
	logger = new Logger(RssLoopService.name);
	constructor(
		private rssItem: RssItemService,
		private rss: RssService,
		private analyser: AnalyserService,
		private downloader: DownloaderService,
		private torrent: TorrentService,
	) {}

	onModuleInit() {
		this.handler();
	}

	@Interval(JOB_RSS, TWO_HOURS)
	async handler() {
		const rssList = await this.rssItem.findAggregateRss();
		for (const rss of rssList) {
			const torrents = await this.rss.request(rss.url);
			if (!torrents) continue;
			const torrentDataList = await this.analyser.torrentsToData(torrents, rss);
			for (const torrent of torrentDataList) {
				this.logger.debug(`Download ${torrent.bangumi.nameZh}`);
				await this.downloader.addTorrent(torrent.url, torrent.bangumi.savePath);
			}
			await this.torrent.createMany(torrentDataList);
		}
	}
}
