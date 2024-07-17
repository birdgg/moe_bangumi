import { Qbittorent } from "@/libs/qbittorrent";
import { Torrent, TorrentContent } from "@/libs/qbittorrent/types";
import { getErrorMessage } from "@/utils/error";
import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { SettingService } from "../setting/setting.service";
import { CATEGORY_BANGUMI, TAG_UNRENAMED } from "./downloader.constant";

export type TorrentWithContent = Torrent & { content: TorrentContent[] };

@Injectable()
export class DownloaderService implements OnModuleInit {
	logger = new Logger(DownloaderService.name);
	client!: Qbittorent;
	constructor(private readonly settingService: SettingService) {}

	async onModuleInit() {
		const downloader = this.settingService.get().downloader;
		this.client = new Qbittorent(downloader);
		try {
			await this.client.login();
		} catch (e) {
			this.logger.error(getErrorMessage(e));
		}
		this.logger.log("Downloader connectted");
	}

	async addTorrent(url: string, savepath: string) {
		this.client
			.addTorrent({
				urls: url,
				savepath,
				category: CATEGORY_BANGUMI,
				tags: TAG_UNRENAMED,
			})
			.catch((e) => {
				this.logger.error(getErrorMessage(e));
			});
	}

	async getUnrenamedTorrentList() {
		const { data: torrents } = await this.client.getTorrentList({
			filter: "completed",
			category: CATEGORY_BANGUMI,
			tag: TAG_UNRENAMED,
		});
		for (const torrent of torrents) {
			const { data: content } = await this.client.getTorrentContent(
				torrent.hash,
			);
			// @ts-expect-error
			torrent.content = content;
		}

		return torrents as TorrentWithContent[];
	}

	async renameTorrent(hash: string, oldPath: string, newPath: string) {
		try {
			await this.client.renameFile({ hash, oldPath, newPath });
			await this.client.removeTorrentTag(hash, TAG_UNRENAMED);
			this.logger.log(`Rename torrent ${oldPath} to ${newPath}`);
		} catch (e) {
			this.logger.error(getErrorMessage(e));
		}
	}

	async removeTorrentTag(hash: string, tag: string) {
		this.client.removeTorrentTag(hash, tag);
	}
}
