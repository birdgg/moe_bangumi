import { Module } from "@nestjs/common";
import { AnalyserModule } from "../analyser/analyser.module";
import { DownloaderModule } from "../downloader/downloader.module";
import { SettingModule } from "../setting/setting.module";
import { EpisodeService } from "./episode.service";

@Module({
	imports: [SettingModule, DownloaderModule, AnalyserModule],
	providers: [EpisodeService],
	exports: [EpisodeService],
})
export class EpisodeModule {}
