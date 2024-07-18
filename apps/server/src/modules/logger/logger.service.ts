import fs from "node:fs";
import { LOG_FILE } from "@/constants/path.constant";
import { Injectable } from "@nestjs/common";

@Injectable()
export class LoggerService {
	clear() {
		fs.writeFileSync(LOG_FILE, "");
	}
}
