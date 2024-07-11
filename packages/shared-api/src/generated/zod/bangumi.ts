import * as z from "zod"

export const BangumiModel = z.object({
  id: z.number().int(),
  nameZh: z.string(),
  nameJp: z.string().nullish(),
  nameEn: z.string().nullish(),
  poster: z.string(),
  season: z.number().int(),
  group: z.string().nullish(),
  sub: z.string().nullish(),
  dpi: z.string().nullish(),
  createdAt: z.date(),
  updatedAt: z.date(),
})
