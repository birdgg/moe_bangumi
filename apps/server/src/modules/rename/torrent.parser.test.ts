import { describe, expect, test } from "vitest";
import {
	TorrentParserParams,
	TorrentParserResult,
	torrentParser,
} from "./torrent.parser";

const tests: {
	data: TorrentParserParams;
	expected: TorrentParserResult;
}[] = [
	{
		data: {
			contentName: "[MingY] Senpai wa Otokonoko [02][1080p][CHS&CHT&JPN].mkv",
			season: 1,
		},
		expected: {
			group: "MingY",
			title: "Senpai wa Otokonoko",
			season: 1,
			ext: ".mkv",
			episode: 2,
		},
	},
];

describe("TorrentParser", () => {
	test.each(tests)(
		"should parse torrent name correctly",
		({ expected, data }) => {
			const result = torrentParser(data);
			for (const key in expected) {
				expect(result?.[key]).toBe(expected[key]);
			}
		},
	);
});
