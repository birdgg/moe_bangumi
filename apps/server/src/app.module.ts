import { BangumiModule } from "@/modules/bangumi/bangumi.module";
import { LoggerModule } from "@/modules/logger/logger.module";
import { NotificationModule } from "@/modules/notification/notification.module";
import { RenameModule } from "@/modules/rename/rename.module";
import { SettingModule } from "@/modules/setting/setting.module";
import { CacheModule } from "@nestjs/cache-manager";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { ScheduleModule } from "@nestjs/schedule";
import { ServeStaticModule } from "@nestjs/serve-static";
import { CLIENT_DIR, POSTER_DIR } from "./constants/path.constant";
import { DatabaseModule } from "./modules/database/database.module";
import { DownloaderModule } from "./modules/downloader/downloader.module";
import { HttpModule } from "./modules/http/http.module";
import { RssModule } from "./modules/rss/rss.module";

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		ServeStaticModule.forRoot({
			rootPath: CLIENT_DIR,
			exclude: ["/api/(.*)", "/posters/(.*)"],
		}),
		ServeStaticModule.forRoot({
			rootPath: POSTER_DIR,
			serveRoot: "/posters",
		}),
		LoggerModule,
		EventEmitterModule.forRoot({
			wildcard: true,
			delimiter: ".",
		}),
		ScheduleModule.forRoot(),
		CacheModule.register({
			isGlobal: true,
		}),
		SettingModule.forRootAsync(),
		HttpModule.forRootAsync(),
		DatabaseModule,
		RssModule,
		RenameModule,
		DownloaderModule,
		NotificationModule,
		BangumiModule,
	],
})
export class AppModule {}
