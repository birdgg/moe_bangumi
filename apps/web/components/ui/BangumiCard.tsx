"use client";

import { Bangumi } from "@/queries/generatedApi";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

export function BangumiCard(bangumi: Bangumi) {
  return (
    <Card className="w-[300px]">
      <CardHeader>
        <Image
          src={`${process.env.NEXT_PUBLIC_BACKEND}/${bangumi.poster}`}
          alt="poster"
          width={300}
          height={400}
        />
      </CardHeader>
      <CardContent>
        <p>{bangumi.nameZh}</p>
      </CardContent>
      <CardFooter>
        <p>Season {bangumi.season}</p>
      </CardFooter>
    </Card>
  );
}
