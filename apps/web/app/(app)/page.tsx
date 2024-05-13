import BangumiList from "@/components/bangumi/BangumiList";
import { Suspense } from "react";

export default async function IndexPage() {
  return (
    <Suspense>
      <BangumiList />
    </Suspense>
  );
}
