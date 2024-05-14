import { titleParser } from './titleParser';

const successTitles = [
  {
    title:
      '【豌豆字幕组&风之圣殿字幕组】★04月新番[鬼灭之刃 柱训练篇 / Kimetsu_no_Yaiba-Hashira_Geiko_Hen][01(56)][简体][1080P][MP4]',
    expectResult: {
      bangumi: {
        nameZh: '鬼灭之刃 柱训练篇',
        season: 1,
        sub: 'CHS',
        dpi: '1080P',
      },
      episode: {
        episode: 1,
      },
    },
  },
  {
    title:
      '[桜都字幕组] 欢迎来到实力至上主义教室 第三季 / Youkoso Jitsuryoku Shijou Shugi no Kyoushitsu e 3rd Season [13][1080p][简体内嵌]',
    expectResult: {
      bangumi: {
        nameZh: '欢迎来到实力至上主义教室',
        season: 3,
        sub: 'CHS',
        dpi: '1080p',
      },
      episode: {
        episode: 13,
      },
    },
  },
  {
    title:
      '[爱恋字幕社&漫猫字幕社][4月新番][无职转生Ⅱ ～到了异世界就拿出真本事～][Mushoku Tensei II][17][1080p][MP4][简中]',
    expectResult: {
      bangumi: {
        nameZh: '无职转生Ⅱ ～到了异世界就拿出真本事～',
        season: 1,
        sub: 'CHS',
        dpi: '1080p',
      },
      episode: {
        episode: 17,
      },
    },
  },
  {
    title:
      '[LoliHouse] 转生为第七王子，随心所欲的魔法学习之路 / Dainana Ouji - 06 [WebRip 1080p HEVC-10bit AAC][简繁内封字幕]',
    expectResult: {
      bangumi: {
        nameZh: '转生为第七王子，随心所欲的魔法学习之路',
        season: 1,
        sub: 'CHS',
        dpi: '1080p',
      },
      episode: {
        episode: 6,
      },
    },
  },
];

const failedTitle =
  '[LoliHouse] 肌肉魔法使-MASHLE- 神觉者候补选拔试验篇 / Mashle Season 2 [01-12(13-24) 合集][WebRip 1080p HEVC-10bit AAC][简繁内封字幕][Fin]';

describe('rawParser', () => {
  it('should parse raw title', () => {
    successTitles.forEach(({ title, expectResult }) => {
      const result = titleParser(title);
      for (const key in expectResult.bangumi) {
        expect(result.bangumi[key]).toBe(expectResult.bangumi[key]);
      }
      expect(result.episode.episode).toBe(expectResult.episode.episode);
    });
  });

  it('should throw error when title is a collection', () => {
    expect(titleParser(failedTitle)).toHaveProperty('error');
  });
});
