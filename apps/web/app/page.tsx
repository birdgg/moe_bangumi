import { BangumiCard } from "@/components/ui/BangumiCard";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { moeBangumiApi } from "@/queries/api";

export default async function Page() {
  const res = await moeBangumiApi.bangumisControllerFindAll();
  return (
    <main className="">
      <div className="fixed w-full py-5 bg-blue-500"></div>
      <div className="flex flex-row h-[200px] pt-[40px]">
        <div className="h-full w-[30px] bg-pink-300"></div>
        <div className="flex-1 grid grid-cols-4 gap-4">
          {res.data.map((bangumi, index) => (
            <BangumiCard {...bangumi} key={index} />
          ))}
        </div>
      </div>
    </main>
  );
}
