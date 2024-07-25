import { Global, Module } from "@nestjs/common";
import { BangumiService } from "./bangumi.service";
import { PrismaService } from "./prisma.service";
import { RssItemService } from "./rssItem.service";
import { TorrentService } from "./torrent.service";

@Global()
@Module({
	providers: [PrismaService, BangumiService, RssItemService, TorrentService],
	exports: [BangumiService, RssItemService, TorrentService],
})
export class DatabaseModule {}
