import { mkdirSync } from "node:fs";
import { DATA_DIR, LOG_DIR, POSTER_DIR } from "./constants/path.constant";

export function prepare() {
	// create data dir
	mkdirSync(DATA_DIR, { recursive: true });
	mkdirSync(POSTER_DIR, { recursive: true });
	mkdirSync(LOG_DIR, { recursive: true });
}
