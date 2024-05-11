export function getSavePath(basePath: string, bangumi: string, season: number) {
  return `${basePath}/${bangumi}/Season ${getNumberString(season)}`;
}

export function getEpisodeName(
  bangumi: string,
  season: number,
  episode: number,
) {
  return `${bangumi} S${getNumberString(season)}E${getNumberString(episode)}`;
}

// export function parsePath(path: string): { bangumi: string; season: number } {}

// utils
function getNumberString(num: number) {
  return num > 10 ? `${num}` : `0${num}`;
}
