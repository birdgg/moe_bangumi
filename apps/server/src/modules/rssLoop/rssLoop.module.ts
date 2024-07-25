import { Global, Module } from "@nestjs/common";
import { RssLoopService } from "./rssLoop.service";

@Global()
@Module({
	providers: [RssLoopService],
})
export class RssLoopModule {}
