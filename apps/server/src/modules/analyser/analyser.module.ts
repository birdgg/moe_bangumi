import { Module } from "@nestjs/common";
import { SettingModule } from "../setting/setting.module";
import { AnalyserService } from "./analyser.service";
import { PathAnalyserService } from "./path-analyser.service";

@Module({
	imports: [SettingModule],
	providers: [AnalyserService, PathAnalyserService],
	exports: [AnalyserService, PathAnalyserService],
})
export class AnalyserModule {}
