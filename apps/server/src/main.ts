import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { isDev } from "./constants/env.constant";
import { prepare } from "./prepare";
import { setup } from "./setup";

async function bootstrap() {
	prepare();
	const app = await NestFactory.create(AppModule, { bufferLogs: true });
	setup(app);
	if (isDev) {
		await import("./setup.dev.js").then((resolve) => {
			resolve.setup(app);
		});
	}

	await app.listen(process.env.port || 3001);
}
bootstrap();
