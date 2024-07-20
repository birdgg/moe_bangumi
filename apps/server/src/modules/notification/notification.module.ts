import { Module } from "@nestjs/common";
import { SSEController } from "./log-sse.controller";
import { LogSSEService } from "./log-sse.service";

@Module({
	controllers: [SSEController],
	providers: [LogSSEService],
})
export class NotificationModule {}
