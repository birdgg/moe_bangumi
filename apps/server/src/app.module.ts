import { NotificationModule } from "@/modules/notification/notification.module";
import { RenameModule } from "@/modules/rename/rename.module";
import { SettingModule } from "@/modules/setting/setting.module";
import { DatabaseModule } from "@/processors/database/database.module";
import { HttpModule } from "@/processors/http/http.module";
import { LoggerModule } from "@/processors/logger/logger.module";
import { RssModule } from "@/processors/rss/rss.module";
import { CacheModule } from "@nestjs/cache-manager";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { ScheduleModule } from "@nestjs/schedule";
import { ServeStaticModule } from "@nestjs/serve-static";
import { CLIENT_DIR, POSTER_DIR } from "./constants/path.constant";
import { AnalyserModule } from "./modules/analyser/analyser.module";
import { DownloaderModule } from "./modules/downloader/downloader.module";
import { RssLoopModule } from "./modules/rssLoop/rssLoop.module";

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
		DownloaderModule,
		DatabaseModule,
		RssModule,
		AnalyserModule,
		NotificationModule,
		RssLoopModule,
		RenameModule,
	],
})
export class AppModule {}
