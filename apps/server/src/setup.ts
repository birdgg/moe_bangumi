import { INestApplication } from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";
import { PrismaClientExceptionFilter } from "nestjs-prisma";
import { Logger } from "./modules/logger/logger";
import { LoggerService } from "./modules/logger/logger.service";

export function setup(app: INestApplication) {
	app.useLogger(app.get(Logger));
	app.get(LoggerService).clear();

	const { httpAdapter } = app.get(HttpAdapterHost);
	app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));
}
