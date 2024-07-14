import { describe, expect, test } from "vitest";
import { type RawParserResult, rawParser } from "./raw-parser";

const successTitles: { title: string; expected: Partial<RawParserResult> }[] = [
	{
		title:
			"【豌豆字幕组&风之圣殿字幕组】★04月新番[鬼灭之刃 柱训练篇 / Kimetsu_no_Yaiba-Hashira_Geiko_Hen][01(56)][简体][1080P][MP4]",
		expected: {
			nameZh: "鬼灭之刃 柱训练篇",
			group: "豌豆字幕组&风之圣殿字幕组",
			season: 1,
			sub: "CHS",
			dpi: "1080P",
			episodeNum: 1,
		},
	},
	{
		title:
			"[桜都字幕组] 欢迎来到实力至上主义教室 第三季 / Youkoso Jitsuryoku Shijou Shugi no Kyoushitsu e 3rd Season [13][1080p][简体内嵌]",
		expected: {
			nameZh: "欢迎来到实力至上主义教室",
			group: "桜都字幕组",
			season: 3,
			sub: "CHS",
			dpi: "1080p",
			episodeNum: 13,
		},
	},
	{
		title:
			"[爱恋字幕社&漫猫字幕社][4月新番][无职转生Ⅱ ～到了异世界就拿出真本事～][Mushoku Tensei II][17][1080p][MP4][简中]",
		expected: {
			nameZh: "无职转生Ⅱ ～到了异世界就拿出真本事～",
			season: 1,
			group: "爱恋字幕社&漫猫字幕社",
			sub: "CHS",
			dpi: "1080p",
			episodeNum: 17,
		},
	},
	{
		title:
			"[LoliHouse] 转生为第七王子，随心所欲的魔法学习之路 / Dainana Ouji - 06 [WebRip 1080p HEVC-10bit AAC][简繁内封字幕]",
		expected: {
			nameZh: "转生为第七王子，随心所欲的魔法学习之路",
			season: 1,
			group: "LoliHouse",
			sub: "CHS",
			dpi: "1080p",
			episodeNum: 6,
		},
	},
];

const failedTitle =
	"[LoliHouse] 肌肉魔法使-MASHLE- 神觉者候补选拔试验篇 / Mashle Season 2 [01-12(13-24) 合集][WebRip 1080p HEVC-10bit AAC][简繁内封字幕][Fin]";

describe("rawParser", () => {
	test.each(successTitles)("should success parsed", ({ title, expected }) => {
		const result = rawParser(title);
		for (const key in expected) {
			expect(result[key]).toBe(expected[key]);
		}
	});

	test("should throw error when title is a collection", () => {
		expect(() => rawParser(failedTitle)).toThrowError();
	});
});
