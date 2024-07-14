import { z } from "zod";
import { EpisodeSchema } from "./generated/zod";

export type Episode = z.infer<typeof EpisodeSchema>;