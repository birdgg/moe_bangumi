import { BangumiController } from "@/modules/bangumi/bangumi.contrller";
import { Module } from "@nestjs/common";
import { PosterModule } from "../poster/poster.module";
import { BangumiService } from "./bangumi.service";

@Module({
	imports: [PosterModule],
	controllers: [BangumiController],
	providers: [BangumiService],
	exports: [BangumiService],
})
export class BangumiModule {}
