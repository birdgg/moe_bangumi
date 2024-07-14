import { Module } from "@nestjs/common";
import { BangumiModule } from "../bangumi/bangumi.module";
import { EpisodeModule } from "../episode/episode.module";
import { MikanService } from "./mikan.service";

@Module({
	imports: [BangumiModule, EpisodeModule],
	providers: [MikanService],
	exports: [MikanService],
})
export class MikanModule {}
