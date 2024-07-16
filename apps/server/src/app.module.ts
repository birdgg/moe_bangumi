import path from "node:path";
import { BangumiModule } from "@/modules/bangumi/bangumi.module";
import { LoggerModule } from "@/modules/logger/logger.module";
import { MikanModule } from "@/modules/mikan/mikan.module";
import { SettingModule } from "@/modules/setting/setting.module";
import { CacheModule } from "@nestjs/cache-manager";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { ScheduleModule } from "@nestjs/schedule";
import { ServeStaticModule } from "@nestjs/serve-static";
import { PrismaModule } from "nestjs-prisma";
import { EpisodeModule } from "./modules/episode/episode.module";
import { RenameModule } from "./modules/rename/rename.module";

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: [".env", ".env.local"],
		}),
		ServeStaticModule.forRoot({
			rootPath: path.join(__dirname, "..", "public"),
			exclude: ["/api/(.*)", "/swagger"],
		}),
		LoggerModule,
		EventEmitterModule.forRoot(),
		ScheduleModule.forRoot(),
		PrismaModule.forRoot({
			isGlobal: true,
		}),
		CacheModule.register({
			isGlobal: true,
		}),
		SettingModule,
		BangumiModule,
		EpisodeModule,
		MikanModule,
		RenameModule,
	],
})
export class AppModule {}
