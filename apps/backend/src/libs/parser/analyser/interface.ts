import { Prisma } from '@prisma/client';

export type RawParserResult = {
  bangumi: Prisma.BangumiUncheckedCreateInput;
  episode: Prisma.EpisodeUncheckedCreateInput;
  error?: string;
};
