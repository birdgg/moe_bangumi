import { Card, CardContent } from "@/components/ui/card";
import type { Bangumi } from "@/libs/client";

export function BangumiCard({ nameZh, poster, group, sub, dpi }: Bangumi) {
  const tags = [group, sub, dpi];
  return (
    <Card className="col-span-1 w-full max-w-[300px] aspect-[3/4] overflow-hidden rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl">
      <img
        src={poster === "default" ? "placeholder.svg" : poster}
        alt="poster"
        height={300}
        className="w-full object-cover"
      />
      <CardContent className="p-4">
        <h3 className="text-xl font-bold">{nameZh}</h3>
        <div className="mt-2 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
