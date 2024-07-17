"use client";

import { BangumiList } from "@/components/bangumi/bangumi-list";
import { Suspense } from "react";

export default function HomePage() {
	return (
		<Suspense fallback={<div>loading</div>}>
			<BangumiList />
		</Suspense>
	);
}
