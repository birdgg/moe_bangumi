import { Module } from "@nestjs/common";
import { AnalyserService } from "./analyser.service";
import { PathAnalyserService } from "./path-analyser.service";

@Module({
	providers: [AnalyserService, PathAnalyserService],
	exports: [AnalyserService, PathAnalyserService],
})
export class AnalyserModule {}
