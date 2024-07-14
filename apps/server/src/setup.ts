import { INestApplication } from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";
import { contract } from "@repo/api";
import { apiReference } from "@scalar/nestjs-api-reference";
import { generateOpenApi } from "@ts-rest/open-api";
import { PrismaClientExceptionFilter } from "nestjs-prisma";
import { Logger } from "./modules/logger/logger";
import { LoggerService } from "./modules/logger/logger.service";

export function setup(app: INestApplication) {
	app.useLogger(app.get(Logger));
	app.get(LoggerService).clear();

	const { httpAdapter } = app.get(HttpAdapterHost);
	app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

	const document = generateOpenApi(
		contract,
		{
			info: {
				title: "Moe Bangumi API",
				version: "1.0.0",
			},
		},
		{
			setOperationId: "concatenated-path",
		},
	);
	app.use(
		"/swagger",
		apiReference({
			spec: {
				content: document,
			},
		}),
	);
}
