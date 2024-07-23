import { Module } from "@nestjs/common";
import { BangumiController } from "./bangumi.controller";

@Module({
	controllers: [BangumiController],
})
export class ApiModule {}
