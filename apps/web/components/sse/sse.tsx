"use client";

import { SERVER_URL } from "@/constants/url.constant";
import { useEffect } from "react";
import { toast } from "sonner";

interface MessageEvent {
	data: string;
}

export function ServerNotification() {
	useEffect(() => {
		const eventSource = new EventSource(`${SERVER_URL}/api/sse`);

		eventSource.onmessage = (event: MessageEvent) => {
			try {
				const { level, message } = JSON.parse(event.data);
				if (level === "error") {
					toast.error(message, {
						duration: Number.POSITIVE_INFINITY,
						closeButton: true,
					});
				} else {
					toast.warning(message);
				}
			} catch (e) {
				console.log("parse failed with: ", event.data);
			}
		};

		eventSource.onerror = (error) => {
			console.error("EventSource failed:", error);
			eventSource.close();
		};

		return () => {
			eventSource.close();
		};
	}, []);

	return null;
}
