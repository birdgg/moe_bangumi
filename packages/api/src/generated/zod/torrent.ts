import * as z from "zod"
import { CompleteBangumi, RelatedBangumiSchema, CompleteRssItem, RelatedRssItemSchema } from "./index"

export const TorrentSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  url: z.string(),
  bangumiId: z.number().int().nullish(),
  rssItemId: z.number().int().nullish(),
})

export interface CompleteTorrent extends z.infer<typeof TorrentSchema> {
  bangumi?: CompleteBangumi | null
  rssItem?: CompleteRssItem | null
}

/**
 * RelatedTorrentSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedTorrentSchema: z.ZodSchema<CompleteTorrent> = z.lazy(() => TorrentSchema.extend({
  bangumi: RelatedBangumiSchema.nullish(),
  rssItem: RelatedRssItemSchema.nullish(),
}))
