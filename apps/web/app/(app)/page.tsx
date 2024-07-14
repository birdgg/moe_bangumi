import { Suspense } from "react";
import { BangumiList } from "@/components/bangumi/bangumi-list";

export default async function HomePage() {
  return (
    <Suspense fallback={<div>loading</div>}>
      <BangumiList />
    </Suspense>
  );
}
