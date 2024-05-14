import { RawParserResult } from './interface';
import { getEpisodeName } from './pathParser';

const EPISODE_RE = /\d+/;
const TITLE_RE =
  /(.*|\[.*])( -? \d+|\[\d+]|\[\d+.?[vV]\d]|\[\d+\(\d+\)\]|第\d+[话話集]|\[第?\d+[话話集]]|\[\d+.?END]|[Ee][Pp]?\d+)(.*)/;
const RESOLUTION_RE = /1080|720|2160|4K/;
const SOURCE_RE = /B-Global|[Bb]aha|[Bb]ilibili|AT-X|Web/;
const SUB_RE = /[(简繁日)字幕]|CH|BIG5|GB/;
// const PREFIX_RE = /[^\w\s\u4e00-\u9fff\u3040-\u309f\u30a0-\u30ff-]/;
const SEASON_RE = /S\d{1,2}|Season \d{1,2}|[第].[季期]/;
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
  简: 'CHS',
  繁: 'CHT',
  日: 'JP',
};

function trimBrackets(raw: string): string {
  return raw.replace(/[\[\]]/g, '');
}

function preProcess(rawName: string): string {
  return rawName.replace('【', '[').replace('】', ']');
}

function prefixProcess(raw: string) {
  let nameArray = raw.split(/\/|\[|\]/);

  nameArray = nameArray
    .filter((item) => {
      return item !== '' && !/新番|月?番/.test(item);
    })
    .map((item) => item.trim());

  if (nameArray.length === 1) {
    nameArray = nameArray[0].split(' ');
  }
  return nameArray.join('/');
}

function groupProcess(raw: string) {
  let group = '',
    name = '';
  const matched = raw.match(/\[.*?\]/);
  if (matched) {
    group = matched[0];
  }
  name = raw.replace(group, '');
  return {
    group: trimBrackets(group),
    name,
  };
}

function seasonProcess(raw: string): [string, number] {
  let season = 1,
    rawName = raw.replace(SEASON_RE, '');
  const seasons = raw.match(SEASON_RE);
  const matchedRawName = rawName.match(/\[(.*?)\]/);
  if (matchedRawName) {
    rawName = matchedRawName[1];
  }

  if (!seasons) {
    return [rawName, season];
  }

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
  let names = name
    .trim()
    .split(/\/|\s{2}|-{2}/)
    .filter((name) => name !== '');

  if (names.length === 1) {
    if (name.match(/_{1}/)) {
      names = name.split('_');
    } else if (name.match(' - {1}')) {
      names = name.split('-');
    }
  }
  if (names.length === 1) {
    const splitSpace = names[0].split(' ');
    for (const idx of [0, splitSpace.length - 1]) {
      if (splitSpace[idx].match(/^[\u4e00-\u9fa5]{2,}/)) {
        const chs = splitSpace[idx];
        splitSpace.splice(idx, 1);
        names = [chs, splitSpace.join(' ')];
        break;
      }
    }
  }
  names.forEach((item) => {
    if (item.match(SUB_JP_RE) && !nameJp) {
      nameJp = item.trim();
    } else if (item.match(SUB_ZH_RE) && !nameZh) {
      nameZh = item.trim();
    } else if (item.match(SUB_EN_RE) && !nameEn) {
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

function process(rawTitle: string): RawParserResult {
  const contentTitle = preProcess(rawTitle.trim());

  // try to match [group with title, episode, rest tags]
  const matchObj = TITLE_RE.exec(contentTitle);
  if (!matchObj) {
    throw new Error(`Not match title regex: ${contentTitle}`);
  }
  const [groupAndName, episodeInfo, other] = matchObj
    .slice(1, 4)
    .map((x) => x.trim());

  const { group, name } = groupProcess(groupAndName);

  const prefixedName = prefixProcess(name);
  const [rawName, season] = seasonProcess(prefixedName);

  let nameEn = '';
  let nameZh = '';
  let nameJp = '';
  try {
    [nameEn, nameZh, nameJp] = nameProcess(rawName);
  } catch (error) {
    throw error;
  }
  const rawEpisode = EPISODE_RE.exec(episodeInfo);
  let episode = 0;
  if (rawEpisode !== null) {
    episode = parseInt(rawEpisode[0]);
  }
  const [sub, dpi, source] = findTags(other);
  return {
    bangumi: {
      nameEn,
      nameZh,
      nameJp,
      season,
      group,
      sub,
      dpi,
      source,
      savePath: '',
    },
    episode: {
      bangumiId: 0,
      name: getEpisodeName(nameZh, season, episode),
      torrent: '',
      episode,
    },
  };
}

/**
 * extract infomation from rss title
 */
export function titleParser(raw): RawParserResult {
  try {
    const ret = process(raw);
    return ret;
  } catch (e) {
    return {
      bangumi: null,
      episode: null,
      error: e.message,
    };
  }
}
