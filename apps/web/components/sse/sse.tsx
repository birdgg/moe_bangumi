"use client";

import { SERVER_URL } from "@/constants/url.constant";
import { useEffect } from "react";

export function SSE() {
	useEffect(() => {
		const eventSource = new EventSource(`${SERVER_URL}/api/sse`);

		eventSource.onmessage = (event) => {
			console.log(event.data);
		};

		eventSource.onerror = (error) => {
			console.error("EventSource failed:", error);
			eventSource.close();
		};

		return () => {
			// Clean up the event source when the component is unmounted
			eventSource.close();
		};
	}, []); // Empty dependency array ensures the effect runs only once

	return null;
}
