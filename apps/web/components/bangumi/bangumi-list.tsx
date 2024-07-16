"use client";

import { useBangumis } from "@/queries/bangumi";
import { BangumiCard } from "./bangumi-card";

export async function BangumiList() {
	const data = useBangumis();
	return (
		<div className="grid grid-cols-7 gap-4">
			{/* {bangumis.map((bangumi) => (
        <BangumiCard key={bangumi.id} {...bangumi} />
      ))} */}
		</div>
	);
}
