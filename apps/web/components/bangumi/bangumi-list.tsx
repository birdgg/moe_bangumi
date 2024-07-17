"use client";

import { client } from "@/queries/client";
import { BangumiCard } from "./bangumi-card";

export function BangumiList() {
	const { data } = client.bangumi.get.useQuery();
	if (!data) return null;
	return (
		<>
			{data.map((bangumi) => (
				<BangumiCard key={bangumi.id} {...bangumi} />
			))}
		</>
	);
}
