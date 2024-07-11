import { client } from "@/libs/client";
import { BangumiCard } from "./BangumiCard";

export async function BangumiList() {
  const { body: bangumis } = await client.bangumi.get();
  return (
    <div>
      {bangumis.map((bangumi) => (
        <BangumiCard {...bangumi} />
      ))}
    </div>
  );
}
