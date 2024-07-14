import { Global, Module } from "@nestjs/common";
import { DownloaderService } from "./downloader.service";

@Global()
@Module({
	providers: [DownloaderService],
	exports: [DownloaderService],
})
export class DownloaderModule {}
