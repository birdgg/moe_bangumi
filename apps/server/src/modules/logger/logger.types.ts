import { Level } from "pino";

export interface LogEventPayload {
	level: Level;
	message: string;
}
