import { BangumiCard } from "@/components/bangumi/BangumiCard";
import { moeBangumiApi } from "@/queries/api";

export default async function Page() {
  const res = await moeBangumiApi.bangumisControllerFindAll();
  return (
    <main className="">
      <div className="flex-1 grid grid-cols-4 gap-4">
        {res.data.map((bangumi, index) => (
          <BangumiCard {...bangumi} key={index} />
        ))}
      </div>
    </main>
  );
}
