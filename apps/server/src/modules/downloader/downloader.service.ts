import { Qbittorent } from "@/libs/qbittorrent";
import { Torrent, TorrentContent } from "@/libs/qbittorrent/types";
import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { SettingService } from "../setting/setting.service";
import { TORRENT_CATEGORY } from "./downloader.constant";

export type TorrentWithContent = Torrent & { content: TorrentContent[] };

@Injectable()
export class DownloaderService implements OnModuleInit {
	logger = new Logger(DownloaderService.name);
	client!: Qbittorent;
	constructor(private readonly settingService: SettingService) {}

	async onModuleInit() {
		const downloader = this.settingService.get().downloader;
		this.client = new Qbittorent(downloader);
		await this.client.login();
		if (this.client.isConnected) {
			this.logger.log("Downloader connectted");
		}
	}

	async addTorrent(url: string, savepath: string) {
		this.client.addTorrent({
			urls: url,
			savepath,
			category: TORRENT_CATEGORY,
		});
	}

	async getCompletedTorrentList() {
		const { data: torrents } = await this.client.getTorrentList({
			filter: "completed",
			category: TORRENT_CATEGORY,
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
		this.logger.log(`Rename torrent ${oldPath} to ${newPath}`);
		this.client.renameFile({ hash, oldPath, newPath }).catch((e) => {
			this.logger.error(e.response.data);
		});
	}
}
