import path from "node:path";

const RULES = [
	/(.*) - (\d{1,4}(?!\d|p)|\d{1,4}\.\d{1,2}(?!\d|p))(?:v\d{1,2})?(?: )?(?:END)?(.*)/,
	/(.*)[\[\ E](\d{1,4}|\d{1,4}\.\d{1,2})(?:v\d{1,2})?(?: )?(?:END)?[\]\ ](.*)/,
	/(.*)\[(?:第)?(\d*\.*\d*)[话集話](?:END)?\](.*)/,
	/(.*)第?(\d*\.*\d*)[话話集](?:END)?(.*)/,
	/(.*)(?:S\d{2})?EP?(\d+)(.*)/,
];

const SUBTITLE_LANG = {
	"zh-tw": ["tc", "cht", "繁", "zh-tw"],
	zh: ["sc", "chs", "简", "zh"],
};

export interface TorrentParserParams {
	contentName: string;
	season?: number;
}

export interface TorrentParserResult {
	group?: string;
	title: string;
	season: number;
	ext: string;
	episode: number;
}

function getGroupAndTitle(groupAndTitle: string): {
	group?: string;
	title: string;
} {
	const array = groupAndTitle
		.split(/[\[\]()【】（）]/)
		.filter((item) => item !== "");

	if (array.length <= 1) {
		return {
			group: undefined,
			title: array[0]!,
		};
	}
	if (/\d+/.test(array[1]!)) {
		return {
			group: undefined,
			title: array[1]!,
		};
	}
	return {
		group: array[0],
		title: array[1]!,
	};
}

function getSeasonAndTitle(str: string) {
	const matchedSeason = str.match(/([Ss]|Season )(?<season>\d{1,3})/);
	const title = str.replace(matchedSeason ? matchedSeason[0] : "", "").trim();
	const season = matchedSeason?.groups
		? Number.parseInt(matchedSeason.groups.season as string)
		: 1;

	return { title, season };
}

export function torrentParser({
	contentName,
	season,
}: TorrentParserParams): TorrentParserResult {
	for (const rule of RULES) {
		const matchObj = contentName.match(rule);
		if (matchObj) {
			const { group, title } = getGroupAndTitle(matchObj[1]!);
			const seasonAndTitle = getSeasonAndTitle(title);

			return {
				group,
				title: seasonAndTitle.title,
				season: season ? season : seasonAndTitle.season,
				ext: path.extname(contentName),
				episode: Number.parseInt(matchObj[2]!),
			};
		}
	}
	throw new Error(`Can't parse ${contentName}`);
}
