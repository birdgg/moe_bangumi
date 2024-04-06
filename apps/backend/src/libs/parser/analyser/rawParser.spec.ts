import { rawParser } from './rawParser';

describe('rawParser', () => {
  it('should parse raw title', () => {
    const testTitle =
      '[桜都字幕组] 欢迎来到实力至上主义教室 第三季 / Youkoso Jitsuryoku Shijou Shugi no Kyoushitsu e 3rd Season [13][1080p][简体内嵌]';
    const result = rawParser(testTitle);
    expect(result.nameZh).toBe('欢迎来到实力至上主义教室');
    expect(result.season).toBe(3);
    expect(result.episode).toBe(13);
    expect(result.sub).toBe('chs');
    expect(result.dpi).toBe('1080p');
    expect(result.group).toBe('桜都字幕组');
  });

  it('should return null for collection title', () => {
    const testTitle =
      '[LoliHouse] 肌肉魔法使-MASHLE- 神觉者候补选拔试验篇 / Mashle Season 2 [01-12(13-24) 合集][WebRip 1080p HEVC-10bit AAC][简繁内封字幕][Fin]';
    expect(rawParser(testTitle)).toBeNull();
  });
});
