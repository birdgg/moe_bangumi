import { join } from "node:path";

import { cwd, isDev } from "./env.constant";

export const CLIENT_DIR = join(cwd, "client");

export const DATA_DIR = isDev ? join(cwd, "./tmp") : join("/app", "data");
export const POSTER_DIR = join(DATA_DIR, "posters");
export const LOG_DIR = join(DATA_DIR, "log");
export const LOG_FILE = join(LOG_DIR, "app.log");
