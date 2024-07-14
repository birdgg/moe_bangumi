import type { Prisma } from "@prisma/client";

export interface RawParserResult extends Prisma.BangumiUncheckedCreateInput {
	episodeNum: number;
}

const EPISODE_RE = /\d+/;
const TITLE_RE =
	/(?<rawBangumi>.*|\[.*])(?<rawEpisode> -? \d+|\[\d+]|\[\d+.?[vV]\d]|\[\d+\(\d+\)\]|第\d+[话話集]|\[第?\d+[话話集]]|\[\d+.?END]|[Ee][Pp]?\d+)(?<rawTags>.*)/;
const DPI_RE = /1080|720|2160|4K/;
// const SOURCE_RE = /B-Global|[Bb]aha|[Bb]ilibili|AT-X|Web/;
const SUB_RE = /[(简繁日)字幕]|CH|BIG5|GB/;
// const PREFIX_RE = /[^\w\s\u4e00-\u9fff\u3040-\u309f\u30a0-\u30ff-]/;
const SEASON_RE = /S\d{1,2}|Season \d{1,2}|[第].[季期]/g;
const SUB_JP_RE = /[\u0800-\u4e00]{2,}/;
const SUB_ZH_RE = /[\u4e00-\u9fa5]{2,}/;
const SUB_EN_RE = /[a-zA-Z]{3,}/;

const CHINESE_NUMBER_MAP = {
	一: 1,
	二: 2,
	三: 3,
	四: 4,
	五: 5,
	六: 6,
	七: 7,
	八: 8,
	九: 9,
	十: 10,
};

const CHINESE_SUB_MAP = {
	简: "CHS",
	繁: "CHT",
	日: "JP",
};

function removeBrackets(str: string): string {
	return str.replace(/[[\]]/g, "");
}

function preProcess(str: string) {
	let nameArray = str.split(/\/|\[|\]/);

	nameArray = nameArray
		.filter((item) => {
			return item !== "" && !/新番|月?番/.test(item);
		})
		.map((item) => item.trim());

	if (nameArray.length === 1) {
		nameArray = nameArray[0]!.split(" ");
	}
	return nameArray.join("/");
}

function getGroup(str: string) {
	const matchedGroup = /\[(?<group>[^\]]+)\]/.exec(str);
	// const group = matchedGroup ? matchedGroup[1] : "";
	const group = matchedGroup?.groups?.group ?? "";
	const rawSeasonAndName = matchedGroup
		? str.replace(matchedGroup[0], "")
		: str;
	return { group, rawSeasonAndName };
}

function getSeason(str: string) {
	let season = 1;
	const rawName = removeBrackets(str.replace(SEASON_RE, ""));
	const matchedSeason = str.match(SEASON_RE) ?? [];

	for (const s of matchedSeason) {
		if (/Season|S/.test(s)) {
			season = Number.parseInt(s.replace(/Season|S/g, ""));
			break;
		}
		if (/[第 ].*[季期(部分)]|部分/.test(s)) {
			const seasonPro = s.replace(/[第季期 ]/g, "");
			season = Number.isNaN(Number.parseInt(seasonPro))
				? CHINESE_NUMBER_MAP[seasonPro]
				: Number.parseInt(seasonPro);
			break;
		}
	}

	return { season, rawName };
}

function getNames(str: string) {
	const result = {
		nameJp: "",
		nameZh: "",
		nameEn: "",
	};
	let names = str
		.trim()
		.split(/\/|\s{2}|-{2}/)
		.filter((name) => name !== "");

	if (names.length === 1) {
		if (/_{1}/.exec(str)) {
			names = str.split("_");
		} else if (/ - {1}/.exec(str)) {
			names = str.split("-");
		}
	}
	if (names.length === 1) {
		const nameArray = names[0]!.split(" ");
		for (const idx of [0, nameArray.length - 1]) {
			if (/^[\u4e00-\u9fa5]{2,}/.exec(nameArray[idx]!)) {
				const chs = nameArray[idx]!;
				nameArray.splice(idx, 1);
				names = [chs, nameArray.join(" ")];
				break;
			}
		}
	}

	for (const name of names) {
		if (SUB_JP_RE.exec(name)) {
			result.nameJp = name.trim();
		} else if (SUB_ZH_RE.exec(name)) {
			result.nameZh = name.trim();
		} else if (SUB_EN_RE.exec(name)) {
			result.nameEn = name.trim();
		}
	}
	return result;
}

function bangumiProcess(str: string) {
	const { group, rawSeasonAndName } = getGroup(str);
	const { season, rawName } = getSeason(preProcess(rawSeasonAndName));
	const { nameJp, nameZh, nameEn } = getNames(rawName);
	const originName = nameEn === "" ? nameZh : nameEn;

	return {
		originName,
		group,
		season,
		nameJp,
		nameZh,
		nameEn,
	};
}

function episodeProcess(str: string) {
	const episodeStr = EPISODE_RE.exec(str);
	return episodeStr ? Number.parseInt(episodeStr[0]) : 1;
}

// get sub, dpi
function tagsProcess(other: string) {
	const elements = other
		.replace(/[[\]()（）]/g, " ")
		.split(" ")
		.filter((x) => x !== "");
	let sub = "";
	let dpi = "";

	for (const element of elements) {
		const matched = SUB_RE.exec(element);
		if (matched) {
			sub = CHINESE_SUB_MAP[matched[0]] || element;
		} else if (DPI_RE.test(element)) {
			dpi = element;
		}
	}
	return [cleanSub(sub), dpi];
}

function cleanSub(sub: string | null) {
	if (sub === null) {
		return sub;
	}
	return sub.replace(/_MP4|_MKV/g, "");
}

export function rawParser(str: string): RawParserResult {
	const title = str.trim().replace("【", "[").replace("】", "]");

	const matchedTitle = TITLE_RE.exec(title);
	if (!matchedTitle) {
		throw new Error(`Not match title regex: ${title}`);
	}

	// @ts-expect-error https://github.com/microsoft/TypeScript/issues/30921
	const { rawBangumi, rawEpisode, rawTags } = matchedTitle.groups;

	const bangumi = bangumiProcess(rawBangumi as string);
	const episode = episodeProcess(rawEpisode as string);
	const [sub, dpi] = tagsProcess(rawTags as string);
	return {
		...bangumi,
		sub,
		dpi,
		episodeNum: episode,
	};
}
