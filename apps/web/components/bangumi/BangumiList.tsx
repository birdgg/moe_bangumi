import { bangumiClient } from "@/queries/api";
import { BangumiCard } from "./BangumiCard";

export default async function BangumiList() {
  const { data } = await bangumiClient.GET("/api/bangumis");
  return (
    <div className="grid lg:grid-cols-6 md:grid-cols-3 gap-4">
      {data?.map((bangumi) => <BangumiCard {...bangumi} />)}
    </div>
  );
}
