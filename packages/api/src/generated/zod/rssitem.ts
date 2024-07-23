import * as z from "zod"
import { CompleteTorrent, RelatedTorrentSchema } from "./index"

export const RssItemSchema = z.object({
  id: z.number().int(),
  url: z.string(),
  aggregate: z.boolean(),
  enabled: z.boolean(),
})

export interface CompleteRssItem extends z.infer<typeof RssItemSchema> {
  Torrent: CompleteTorrent[]
}

/**
 * RelatedRssItemSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedRssItemSchema: z.ZodSchema<CompleteRssItem> = z.lazy(() => RssItemSchema.extend({
  Torrent: RelatedTorrentSchema.array(),
}))
