import { Qbittorent } from "@/libs/qbittorrent";
import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { SettingService } from "../setting/setting.service";
import { TORRENT_CATEGORY } from "./downloader.constant";

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
}
