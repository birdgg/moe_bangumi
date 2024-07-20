import { Controller, MessageEvent, Req, Sse } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import type { Request } from "express";
import { Observable, concat, from, fromEvent, map } from "rxjs";
import { EVENT_LOG } from "../logger/logger.constant";
import { LogEventPayload } from "../logger/logger.types";
import { LogSSEService } from "./log-sse.service";

@Controller("/api")
export class SSEController {
	constructor(
		private eventEmitter: EventEmitter2,
		private sseService: LogSSEService,
	) {}

	@Sse("/sse")
	sse(@Req() req: Request): Observable<MessageEvent> {
		const cachedEvents = this.sseService.getCachedEvents();

		req.on("close", () => {
			this.sseService.startCacheEvents();
		});

		return concat(
			from(cachedEvents),
			fromEvent(this.eventEmitter, `${EVENT_LOG}.**`),
		).pipe(
			map((payload) => {
				return { data: payload as LogEventPayload };
			}),
		);
	}
}
