import { Bangumi } from "@prisma/client";

export type BangumiParseResult = Pick<
	Bangumi,
	| "nameEn"
	| "nameJp"
	| "nameZh"
	| "nameRaw"
	| "group"
	| "sub"
	| "dpi"
	| "season"
> & { episode: number };
