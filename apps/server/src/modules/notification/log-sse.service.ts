import { EVENT_LOG } from "@/constants/event.constant";
import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { LogEventPayload } from "../logger/logger.types";

@Injectable()
export class LogSSEService {
	private cachedEvents: LogEventPayload[] = [];
	private enableCache = true;

	@OnEvent(`${EVENT_LOG}.**`)
	handle(payload) {
		if (this.enableCache) this.cachedEvents.push(payload);
	}

	getCachedEvents() {
		const cachedEvents = this.cachedEvents;
		this.cachedEvents = [];
		this.enableCache = false;
		return cachedEvents;
	}

	startCacheEvents() {
		this.cachedEvents = [];
		this.enableCache = true;
	}
}
