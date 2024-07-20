import { BangumiModule } from "@/modules/bangumi/bangumi.module";
import { EpisodeModule } from "@/modules/episode/episode.module";
import { LoggerModule } from "@/modules/logger/logger.module";
import { MikanModule } from "@/modules/mikan/mikan.module";
import { NotificationModule } from "@/modules/notification/notification.module";
import { RenameModule } from "@/modules/rename/rename.module";
import { SettingModule } from "@/modules/setting/setting.module";
import { CacheModule } from "@nestjs/cache-manager";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { ScheduleModule } from "@nestjs/schedule";
import { ServeStaticModule } from "@nestjs/serve-static";
import { PrismaModule } from "nestjs-prisma";
import { CLIENT_DIR, POSTER_DIR } from "./constants/path.constant";

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		ServeStaticModule.forRoot({
			rootPath: CLIENT_DIR,
			serveRoot: "/",
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
		PrismaModule.forRoot({
			isGlobal: true,
		}),
		CacheModule.register({
			isGlobal: true,
		}),
		SettingModule.forRootAsync(),
		NotificationModule,
		BangumiModule,
		EpisodeModule,
		MikanModule,
		RenameModule,
	],
})
export class AppModule {}
