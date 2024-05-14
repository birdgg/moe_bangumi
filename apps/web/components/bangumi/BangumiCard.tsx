"use client";

import type { components } from "@/queries/generatedApi";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Badge } from "../ui/badge";

type Props = components["schemas"]["Bangumi"];

const CARD_WIDTH = 300;
const IMAGE_WIDTH = CARD_WIDTH;
const RADIO = 1.5;

export function BangumiCard({ poster, nameZh, season }: Props) {
  return (
    <Card className="rounded-lg overflow-hidden">
      <Image
        className="object-cover w-full"
        src={`${process.env.NEXT_PUBLIC_BACKEND}/${poster}`}
        alt="poster"
        width={IMAGE_WIDTH}
        height={IMAGE_WIDTH * RADIO}
        priority={false}
      />
      <CardContent className="pt-3">
        <h3 className="text-lg font-semibold">{nameZh}</h3>
        <div className="flex flex-wrap gap-2 mt-2">
          <Badge variant="secondary">Season {season}</Badge>
        </div>
      </CardContent>
    </Card>
  );
}
