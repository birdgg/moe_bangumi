import { Module } from "@nestjs/common";
import { SettingModule } from "../setting/setting.module";
import { DownloaderService } from "./downloader.service";

@Module({
	imports: [SettingModule],
	providers: [DownloaderService],
	exports: [DownloaderService],
})
export class DownloaderModule {}
