"use client";

import { useSuspenseBangumis } from "@/queries/bangumi";
import { BangumiCard } from "./bangumi-card";

export function BangumiList() {
	const { data } = useSuspenseBangumis();
	return (
		<div className="grid grid-cols-7 gap-4">
			{data.map((bangumi) => (
				<BangumiCard key={bangumi.id} {...bangumi} />
			))}
		</div>
	);
}
