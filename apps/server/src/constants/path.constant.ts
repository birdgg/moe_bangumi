import { homedir } from "node:os";
import { join } from "node:path";

import { cwd, isDev } from "./env.constant";

export const HOME = homedir();

export const DATA_DIR = isDev ? join(cwd, "./tmp") : join(HOME, ".moe-bangumi");

export const POSTER_DIR = join(DATA_DIR, "posters");
export const CLIENT_DIR = join(cwd, "client");
export const LOG_DIR = join(DATA_DIR, "log");
export const LOG_FILE = join(LOG_DIR, "app.log");
