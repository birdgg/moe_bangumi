import * as z from "zod";
import { type CompleteBangumi, RelatedBangumiSchema } from "./index";

export const EpisodeSchema = z.object({
	id: z.number().int(),
	nameZh: z.string().nullish(),
	nameJp: z.string().nullish(),
	nameEn: z.string().nullish(),
	episode: z.number().int(),
	bangumiId: z.number().int(),
	torrent: z.string(),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export interface CompleteEpisode extends z.infer<typeof EpisodeSchema> {
	bangumi: CompleteBangumi;
}

/**
 * RelatedEpisodeSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedEpisodeSchema: z.ZodSchema<CompleteEpisode> = z.lazy(() =>
	EpisodeSchema.extend({
		bangumi: RelatedBangumiSchema,
	}),
);
