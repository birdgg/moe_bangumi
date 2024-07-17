"use client";

import { useSuspenseBangumis } from "@/queries/bangumi";
import { BangumiCard } from "./bangumi-card";

export function BangumiList() {
	const { data } = useSuspenseBangumis();
	return (
		<>
			{data.map((bangumi) => (
				<BangumiCard key={bangumi.id} {...bangumi} />
			))}
		</>
	);
}
