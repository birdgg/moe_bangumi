"use client";

import { BangumiList } from "@/components/bangumi/bangumi-list";
import { Suspense } from "react";

export default async function HomePage() {
	return (
		<Suspense fallback={<div>loading</div>}>
			<BangumiList />
		</Suspense>
	);
}
