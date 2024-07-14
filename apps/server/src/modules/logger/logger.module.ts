import { Global, Module } from "@nestjs/common";
import { Logger } from "./logger";
import { LoggerService } from "./logger.service";

@Global()
@Module({
	providers: [Logger, LoggerService],
	exports: [Logger, LoggerService],
})
export class LoggerModule {}
