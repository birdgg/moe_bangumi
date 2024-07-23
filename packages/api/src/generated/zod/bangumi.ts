import * as z from "zod"
import { CompleteTorrent, RelatedTorrentSchema } from "./index"

export const BangumiSchema = z.object({
  id: z.number().int(),
  nameRaw: z.string(),
  nameZh: z.string().nullish(),
  nameJp: z.string().nullish(),
  nameEn: z.string().nullish(),
  poster: z.string(),
  season: z.number().int(),
  group: z.string().nullish(),
  sub: z.string().nullish(),
  dpi: z.string().nullish(),
  needEpsCollect: z.boolean(),
  isEpsCollected: z.boolean(),
  rssLink: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  deleted: z.boolean(),
})

export interface CompleteBangumi extends z.infer<typeof BangumiSchema> {
  Torrent: CompleteTorrent[]
}

/**
 * RelatedBangumiSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedBangumiSchema: z.ZodSchema<CompleteBangumi> = z.lazy(() => BangumiSchema.extend({
  Torrent: RelatedTorrentSchema.array(),
}))
