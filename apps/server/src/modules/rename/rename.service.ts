import path from "node:path";
import { TEN_MINUTES } from "@/constants/date.constant";
import { JOB_RENAME_FILE } from "@/constants/job.constant";
import { TorrentContent } from "@/libs/qbittorrent/types";
import { SettingService } from "@/modules/setting/setting.service";
import { padNumber } from "@/utils/string";
import { Injectable, Logger } from "@nestjs/common";
import { Interval } from "@nestjs/schedule";
import {
	DownloaderService,
	TorrentWithContent,
} from "../downloader/downloader.service";
import { MEDIA_EXT, SEASON_REGEX, SUB_EXT } from "./rename.constant";
import { RenameFile } from "./rename.types";
import { torrentParser } from "./torrent.parser";
@Injectable()
export class RenameService {
	private readonly logger = new Logger(RenameService.name);

	constructor(
		private downloaderService: DownloaderService,
		private settingService: SettingService,
	) {}

	@Interval(JOB_RENAME_FILE, TEN_MINUTES)
	renameHandler() {
		this.rename();
	}

	async rename() {
		if (!this.downloaderService.isEnabled) return;

		this.logger.debug("Start rename job");
		const torrents = await this.downloaderService.getUnrenamedTorrentList();
		for (const torrent of torrents) {
			this.torrentHandler(torrent);
		}
	}

	private torrentHandler(torrent: TorrentWithContent) {
		const { mediaFiles, subFiles } = this.splitFiles(torrent.content);
		// TODO: process collection and sub files
		if (mediaFiles.length === 0) return;

		// TODO: refactor push getInfoFromPath in torrentParser
		const { bangumi, season } = this.getInfoFromPath(torrent.save_path);
		const { episode, ext } = torrentParser({
			contentName: mediaFiles[0]!.name,
			season,
		});
		this.renameFile({
			hash: torrent.hash,
			oldFile: mediaFiles[0]!.name,
			bangumi,
			season,
			episode,
			ext,
		});
	}

	/**
	 * split media files and sub files
	 */
	private splitFiles(contents: TorrentContent[]) {
		const mediaFiles: TorrentContent[] = [];
		const subFiles: TorrentContent[] = [];

		for (const content of contents) {
			const ext = path.extname(content.name.toLowerCase());
			if (MEDIA_EXT.includes(ext)) {
				mediaFiles.push(content);
			}
			if (SUB_EXT.includes(ext)) {
				subFiles.push(content);
			}
		}

		return { mediaFiles, subFiles };
	}

	/**
	 * extract bangumi and season from save path
	 * @param savePath
	 * @example /downloads/前辈是伪娘/Season 01
	 */
	private getInfoFromPath(savePath: string) {
		const baseSavePath = this.settingService.getSavePath();

		const [bangumi, rawSeason] = savePath.replace(baseSavePath, "").split("/");
		if (!bangumi || !rawSeason) {
			throw new Error(`Invalid save path: ${savePath}`);
		}
		const season = rawSeason!.match(SEASON_REGEX)!.groups!.season!;

		return { bangumi, season: Number.parseInt(season) };
	}

	private genFileName(
		bangumi: string,
		season: number,
		episode: number,
		ext: string,
	) {
		return `${bangumi} S${padNumber(season)}E${padNumber(episode)}${ext}`;
	}

	private renameFile({
		hash,
		oldFile,
		bangumi,
		season,
		episode,
		ext,
	}: RenameFile) {
		const newPath = this.genFileName(bangumi, season, episode, ext);
		this.downloaderService.renameTorrent(hash, oldFile, newPath);
	}
}
