import { Module } from "@nestjs/common";
import { AnalyserModule } from "../analyser/analyser.module";
import { BangumiModule } from "../bangumi/bangumi.module";
import { EpisodeModule } from "../episode/episode.module";
import { MikanService } from "./mikan-rss.service";

@Module({
	imports: [AnalyserModule, BangumiModule, EpisodeModule],
	providers: [MikanService],
	exports: [MikanService],
})
export class MikanModule {}
