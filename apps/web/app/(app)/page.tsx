import { BangumiList } from "@/components/bangumi/BangumiList";
import { Suspense } from "react";

export default async function () {
  return (
    <Suspense fallback={<div>loading</div>}>
      <BangumiList />
    </Suspense>
  );
}
