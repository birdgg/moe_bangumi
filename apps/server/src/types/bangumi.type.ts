import { Bangumi } from "@prisma/client";

export type Sub = "CHS" | "CHT" | "JP" | "";

export type BangumiParseResult = {
	nameEn?: string;
	nameJp?: string;
	nameZh?: string;
	nameRaw: string;
	group?: string;
	sub?: Sub;
	dpi?: string;
	season: number;
	episodes: string;
};

export type BulkBangumi = Partial<Bangumi> & { id: number };
