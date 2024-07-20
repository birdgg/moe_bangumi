import { Module } from "@nestjs/common";
import { AnalyserModule } from "../analyser/analyser.module";
import { RenameService } from "./rename.service";

@Module({
	imports: [AnalyserModule],
	providers: [RenameService],
	exports: [RenameService],
})
export class RenameModule {}
