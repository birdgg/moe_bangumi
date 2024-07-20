import { Module } from "@nestjs/common";
import { AnalyserModule } from "../analyser/analyser.module";
import { EpisodeService } from "./episode.service";

@Module({
	imports: [AnalyserModule],
	providers: [EpisodeService],
	exports: [EpisodeService],
})
export class EpisodeModule {}
