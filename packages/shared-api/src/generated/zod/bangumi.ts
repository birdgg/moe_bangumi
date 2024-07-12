import * as z from "zod"

export const BangumiSchema = z.object({
  id: z.number().int(),
  originName: z.string(),
  nameZh: z.string().nullish(),
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
