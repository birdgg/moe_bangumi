const RULES = [
  /(.*) - (\d{1,4}(?!\d|p)|\d{1,4}\.\d{1,2}(?!\d|p))(?:v\d{1,2})?(?: )?(?:END)?(.*)/,
  /(.*)[\[\ E](\d{1,4}|\d{1,4}\.\d{1,2})(?:v\d{1,2})?(?: )?(?:END)?[\]\ ](.*)/,
  /(.*)\[(?:第)?(\d*\.*\d*)[话集話](?:END)?\](.*)/,
  /(.*)第?(\d*\.*\d*)[话話集](?:END)?(.*)/,
  /(.*)(?:S\d{2})?EP?(\d+)(.*)/,
];

// const SUBTITLE_LANG = {
//   'zh-tw': ['tc', 'cht', '繁', 'zh-tw'],
//   zh: ['sc', 'chs', '简', 'zh'],
// };

/**
 * get episode
 */
export function torrentParser(fileName: string) {
  for (let index = 0; index < RULES.length; index++) {
    const matched = fileName.match(RULES[index]);
    if (matched) {
      return parseInt(matched[2]);
    }
  }
}
