import { INestApplication } from "@nestjs/common";
import { contract } from "@repo/api";
import { apiReference } from "@scalar/nestjs-api-reference";
import { generateOpenApi } from "@ts-rest/open-api";

export function setup(app: INestApplication) {
	if (process.env.NODE_ENV === "development") {
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

		app.enableCors();
	}
}
