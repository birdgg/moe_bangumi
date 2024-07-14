import { initContract } from "@ts-rest/core";
import { z } from "zod";
import { BangumiSchema } from "./generated/zod";

const c = initContract();

export type Bangumi = z.infer<typeof BangumiSchema>;
export const bangumiContract = c.router(
	{
		get: {
			method: "GET",
			path: "/",
			responses: {
				200: z.array(BangumiSchema),
			},
		},
	},
	{
		pathPrefix: "/bangumis",
	},
);
