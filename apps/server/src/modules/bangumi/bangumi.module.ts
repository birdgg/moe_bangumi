import { BangumiController } from "@/modules/bangumi/bangumi.contrller";
import { Module } from "@nestjs/common";
import { BangumiService } from "./bangumi.service";

@Module({
	controllers: [BangumiController],
	providers: [BangumiService],
	exports: [BangumiService],
})
export class BangumiModule {}
