import { Episode } from 'src/interfaces/bangumi';
import { RawParserResult } from './interface';

const EPISODE_RE = /\d+/;
const TITLE_RE =
  /(.*|\[.*])( -? \d+|\[\d+]|\[\d+.?[vV]\d]|第\d+[话話集]|\[第?\d+[话話集]]|\[\d+.?END]|[Ee][Pp]?\d+)(.*)/;
const RESOLUTION_RE = /1080|720|2160|4K/;
const SOURCE_RE = /B-Global|[Bb]aha|[Bb]ilibili|AT-X|Web/;
const SUB_RE = /[(简繁日)字幕]|CH|BIG5|GB/;
const PREFIX_RE = /[^\w\s\u4e00-\u9fff\u3040-\u309f\u30a0-\u30ff-]/;

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
  简: 'chs',
  繁: 'cht',
  日: 'jp',
};

function getGroup(name: string): string {
  return name.split(/[\[\]]/)[1];
}

function preProcess(rawName: string): string {
  return rawName.replace('【', '[').replace('】', ']');
}

function prefixProcess(raw: string, group: string) {
  raw = raw.replace(new RegExp(`.${group}.`), '');
  const rawProcess = raw.replace(PREFIX_RE, '/');
  let argGroup = rawProcess.split('/');
  argGroup = argGroup.filter((item) => item !== '');
  if (argGroup.length === 1) {
    argGroup = argGroup[0].split(' ');
  }
  for (const arg of argGroup) {
    if (arg.match(/新番|月?番/) && arg.length <= 5) {
      raw = raw.replace(new RegExp(`.${arg}.`, 'g'), '');
    } else if (arg.match(/港澳台地区/)) {
      raw = raw.replace(new RegExp(`.${arg}.`, 'g'), '');
    }
  }
  return raw;
}

function seasonProcess(seasonInfo: string): [string, number] {
  let nameSeason = seasonInfo;
  const seasonRule = /S\d{1,2}|Season \d{1,2}|[第].[季期]/g;
  nameSeason = nameSeason.replace(/[\[\]]/g, ' ');
  const seasons = nameSeason.match(seasonRule);
  if (!seasons) {
    return [nameSeason, 1];
  }
  const rawName = nameSeason.replace(seasonRule, '');
  let season;
  for (const s of seasons) {
    if (s.match(/Season|S/)) {
      season = parseInt(s.replace(/Season|S/g, ''));
      break;
    } else if (s.match(/[第 ].*[季期(部分)]|部分/)) {
      const seasonPro = s.replace(/[第季期 ]/g, '');
      season = isNaN(parseInt(seasonPro))
        ? CHINESE_NUMBER_MAP[seasonPro]
        : parseInt(seasonPro);
    }
  }
  return [rawName, season];
}

function nameProcess(name: string) {
  let nameEn = null;
  let nameZh = null;
  let nameJp = null;
  name = name.trim();
  name = name.replace(/[(（]仅限港澳台地区[）)]/g, '');
  let split = name.split(/\/|\s{2}|-{2}/);
  split = split.filter((item) => item !== '');
  if (split.length === 1) {
    if (name.match(/_{1}/)) {
      split = name.split('_');
    } else if (name.match(' - {1}')) {
      split = name.split('-');
    }
  }
  if (split.length === 1) {
    const splitSpace = split[0].split(' ');
    for (const idx of [0, splitSpace.length - 1]) {
      if (splitSpace[idx].match(/^[\u4e00-\u9fa5]{2,}/)) {
        const chs = splitSpace[idx];
        splitSpace.splice(idx, 1);
        split = [chs, splitSpace.join(' ')];
        break;
      }
    }
  }
  split.forEach((item) => {
    if (item.match(/[\u0800-\u4e00]{2,}/) && !nameJp) {
      nameJp = item.trim();
    } else if (item.match(/[\u4e00-\u9fa5]{2,}/) && !nameZh) {
      nameZh = item.trim();
    } else if (item.match(/[a-zA-Z]{3,}/) && !nameEn) {
      nameEn = item.trim();
    }
  });
  return [nameEn, nameZh, nameJp];
}

// get sub, dpi, source
function findTags(other: string) {
  const elements = other
    .replace(/[\[\]()（）]/g, ' ')
    .split(' ')
    .filter((x) => x !== '');
  let sub = null;
  let dpi = null;
  let source = null;
  for (const element of elements) {
    const matched = element.match(SUB_RE);
    if (matched) {
      sub = CHINESE_SUB_MAP[matched[0]] || element;
    } else if (RESOLUTION_RE.test(element)) {
      dpi = element;
    } else if (SOURCE_RE.test(element)) {
      source = element;
    }
  }
  return [cleanSub(sub), dpi, source];
}

function cleanSub(sub: string | null) {
  if (sub === null) {
    return sub;
  }
  return sub.replace(/_MP4|_MKV/g, '');
}

function rawProcess(rawTitle: string): RawParserResult | null {
  const contentTitle = preProcess(rawTitle.trim());
  const groupName = getGroup(contentTitle);
  const matchObj = TITLE_RE.exec(contentTitle);
  if (!matchObj) {
    return null;
  }
  const [seasonInfo, episodeInfo, other] = matchObj
    .slice(1, 4)
    .map((x) => x.trim());
  const processRaw = prefixProcess(seasonInfo, groupName);
  const [rawName, season] = seasonProcess(processRaw);
  let nameEn = '';
  let nameZh = '';
  let nameJp = '';
  try {
    [nameEn, nameZh, nameJp] = nameProcess(rawName);
  } catch (error) {}
  const rawEpisode = EPISODE_RE.exec(episodeInfo);
  let episode = 0;
  if (rawEpisode !== null) {
    episode = parseInt(rawEpisode[0]);
  }
  const [sub, dpi, source] = findTags(other);
  return {
    nameEn,
    nameZh,
    nameJp,
    season,
    episode,
    sub,
    dpi,
    source,
    groupName,
  };
}

export function rawParser(raw): RawParserResult | null {
  const ret = rawProcess(raw);
  if (ret === null) {
    console.log(`Parser cannot analyse ${raw}`);
    return null;
  }
  return ret;
}
