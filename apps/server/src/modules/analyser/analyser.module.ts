import { Global, Module } from "@nestjs/common";
import { PosterModule } from "../poster/poster.module";
import { AnalyserService } from "./analyser.service";

@Global()
@Module({
	imports: [PosterModule],
	providers: [AnalyserService],
	exports: [AnalyserService],
})
export class AnalyserModule {}
