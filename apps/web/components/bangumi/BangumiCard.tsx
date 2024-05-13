"use client";

import type { components } from "@/queries/generatedApi";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";

type Props = components["schemas"]["Bangumi"];

const CARD_WIDTH = 300;
const IMAGE_WIDTH = CARD_WIDTH * 0.8;
const RADIO = 1.5;

export function BangumiCard({ poster, nameZh, season }: Props) {
  return (
    // <Card className={cn(`w-[${CARD_WIDTH}px]`)}>
    <Card className="">
      <CardHeader>
        <Image
          className="rounded-md"
          src={`${process.env.NEXT_PUBLIC_BACKEND}/${poster}`}
          alt="poster"
          width={IMAGE_WIDTH}
          height={IMAGE_WIDTH * RADIO}
          priority={false}
        />
      </CardHeader>
      <CardContent>
        <p>{nameZh}</p>
      </CardContent>
      <CardFooter>
        <Badge variant="secondary">Season {season}</Badge>
      </CardFooter>
    </Card>
  );
}
