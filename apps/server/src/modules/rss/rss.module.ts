import { Global, Module } from "@nestjs/common";
import { RssService } from "./rss.service";

@Global()
@Module({
	providers: [RssService],
	exports: [RssService],
})
export class RssModule {}
