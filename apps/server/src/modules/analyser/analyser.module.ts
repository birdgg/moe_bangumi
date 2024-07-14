import { Global, Module } from "@nestjs/common";
import { AnalyserService } from "./analyser.service";

@Global()
@Module({
	providers: [AnalyserService],
	exports: [AnalyserService],
})
export class AnalyserModule {}
