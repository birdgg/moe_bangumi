import fs from "node:fs";
import { Injectable } from "@nestjs/common";
import { LOG_FILE } from "./logger.constant";

@Injectable()
export class LoggerService {
	clear() {
		fs.writeFileSync(LOG_FILE, "");
	}
}
