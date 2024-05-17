import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { configApp } from "./config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    bufferLogs: true,
  });

  configApp(app);

  await app.listen(process.env.PORT || 3200);
}
bootstrap();
