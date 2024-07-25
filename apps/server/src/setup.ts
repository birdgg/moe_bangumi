import { PrismaClientExceptionFilter } from "@/processors/database/prisma-client-exception";
import { Logger } from "@/processors/logger/logger";
import { LoggerService } from "@/processors/logger/logger.service";
import { INestApplication } from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";

export function setup(app: INestApplication) {
	app.useLogger(app.get(Logger));
	app.get(LoggerService).clear();

	const { httpAdapter } = app.get(HttpAdapterHost);
	app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));
}
