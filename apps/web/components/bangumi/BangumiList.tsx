import { client } from "@/libs/client";
import { BangumiCard } from "./BangumiCard";

export async function BangumiList() {
  const { body: bangumis } = await client.bangumi.get();
  return (
    <div className="grid grid-cols-7 gap-4">
      {bangumis.map((bangumi) => (
        <BangumiCard key={bangumi.id} {...bangumi} />
      ))}
    </div>
  );
}
