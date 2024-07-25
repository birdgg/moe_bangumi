import { SettingService } from "@/modules/setting/setting.service";
import { BangumiService } from "@/processors/database/bangumi.service";
import { TorrentService } from "@/processors/database/torrent.service";
import { BangumiParseResult, BulkBangumi } from "@/types/bangumi.type";
import { RawTorrent, TorrentCreateInput } from "@/types/torrent.type";
import { padNumber } from "@/utils/string";
import { Injectable, Logger } from "@nestjs/common";
import { Bangumi, Prisma, RssItem } from "@prisma/client";
import { PosterService } from "../poster/poster.service";
import { rawParser } from "./parsers/raw-parser";

@Injectable()
export class AnalyserService {
	logger = new Logger(AnalyserService.name);
	constructor(
		private setting: SettingService,
		private poster: PosterService,
		private bangumi: BangumiService,
		private torrent: TorrentService,
	) {}

	async torrentsToData(torrents: RawTorrent[], rss: RssItem) {
		const bangumis = await this.bangumi.findAll();
		const newTorrents = await this.torrent.findNewTorrents(torrents);

		const torrentDataList: TorrentCreateInput[] = [];
		let foundedBangumi: Bangumi | undefined = undefined;

		for (const torrent of newTorrents) {
			const rawBangumi = rawParser(torrent.name);
			foundedBangumi = bangumis.find((b) => this.isBangumiFound(rawBangumi, b));

			if (!foundedBangumi) {
				// bangumi not found, create it
				foundedBangumi = await this.createBangumi(rawBangumi, torrent, rss);
				this.logger.debug(
					`Create new Bangumi ${foundedBangumi.nameRaw} Season ${foundedBangumi.season}`,
				);
				bangumis.push(foundedBangumi);
			} else {
				if (this.bangumi.hasEpisode(foundedBangumi, rawBangumi.episodes)) {
					// repeated torrent, skip
					continue;
				}
				foundedBangumi.episodes = `${foundedBangumi.episodes},${rawBangumi.episodes}`;
				if (!foundedBangumi.rssLink.includes(rss.url)) {
					foundedBangumi.rssLink = `${foundedBangumi.rssLink},${rss.url}`;
				}
				await this.bangumi.update(foundedBangumi.id, {
					rssLink: foundedBangumi.rssLink,
					episodes: foundedBangumi.episodes,
				});
			}
			torrentDataList.push({
				name: torrent.name,
				url: torrent.url,
				bangumi: foundedBangumi,
				bangumiId: foundedBangumi.id,
				rssItemId: rss.id,
			});
		}

		return torrentDataList;
	}

	private isBangumiFound(rawBangumi: BangumiParseResult, bangumi: Bangumi) {
		return (
			rawBangumi.season === bangumi.season &&
			rawBangumi.nameRaw === bangumi.nameRaw
		);
	}

	/**
	 * create new bangumi by parse torrent
	 */
	async createBangumi(
		rawBangumi: BangumiParseResult,
		torrent: RawTorrent,
		rss: RssItem,
	) {
		const poster = await this.poster.getFromMikan(torrent.homepage || "");
		return this.bangumi.create({
			...rawBangumi,
			poster,
			needEpsCollect: this.setting.getBy("bangumiManager.epsComplete"),
			savePath: this.getSavePath(rawBangumi),
			rssLink: rss.url,
		});
	}

	getSavePath(
		bangumi: Pick<Prisma.BangumiUncheckedCreateInput, "season" | "nameZh">,
	) {
		const baseSavePath = this.setting.getSavePath();
		const bangumiName = bangumi.nameZh;
		const season = padNumber(bangumi.season);
		return `${baseSavePath}${bangumiName}/Season ${season}`;
	}
}
