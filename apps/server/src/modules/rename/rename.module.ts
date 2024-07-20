import { Module } from "@nestjs/common";
import { AnalyserModule } from "../analyser/analyser.module";
import { DownloaderModule } from "../downloader/downloader.module";
import { RenameService } from "./rename.service";

@Module({
	imports: [DownloaderModule, AnalyserModule],
	providers: [RenameService],
	exports: [RenameService],
})
export class RenameModule {}
