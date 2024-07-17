import { Card, CardFooter, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { Bangumi } from "@repo/api/bangumi";
import Image from "next/image";

const IMAGE_RATIO = 0.7;
const IMAGE_WIDTH = 250;
const IMAGE_HEIGHT = IMAGE_WIDTH / IMAGE_RATIO;

export function BangumiCard({ nameZh, poster, group, sub, dpi }: Bangumi) {
	const tags = [group, sub, dpi];
	const posterSrc =
		poster === "default"
			? "placeholder.svg"
			: `${process.env.NEXT_PUBLIC_SERVER_URL}/posters/${poster}`;

	return (
		<Card className="col-span-1 w-full overflow-hidden rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl">
			<Image
				src={posterSrc}
				alt="poster"
				width={IMAGE_WIDTH}
				height={IMAGE_HEIGHT}
				priority={true}
				className="w-full object-cover"
			/>
			<CardTitle className="font-bold p-2 mt-2">{nameZh}</CardTitle>
			<CardFooter className="px-2 mt-2">
				<div className="flex flex-wrap gap-2">
					{tags.map((tag) => (
						<span
							key={tag}
							className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground"
						>
							{tag}
						</span>
					))}
				</div>
			</CardFooter>
		</Card>
	);
}

export const BangumiCardSkeleton = () => {
	return (
		<>
			{new Array(5).fill(1).map((_, i) => (
				<div
					// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
					key={i}
					className="col-span-1 w-full rounded-lg flex flex-col space-y-4"
				>
					<Skeleton className="h-[345px] w-full rounded-xl" />
					<div className="space-y-2">
						<Skeleton className="h-4 w-[100px]" />
						<Skeleton className="h-4 w-[150px]" />
					</div>
				</div>
			))}
		</>
	);
};
