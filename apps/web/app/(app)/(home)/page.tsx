"use client";

import { BangumiList } from "@/components/bangumi/bangumi-list";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";

export default function HomePage() {
	const router = useRouter();
	const [isFirstVisit, setValue] = useLocalStorage("first-visit", true);
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (isFirstVisit) {
			setValue(false);
			router.replace("/setting", { scroll: false });
		}
	}, [isFirstVisit]);

	return <BangumiList />;
}
