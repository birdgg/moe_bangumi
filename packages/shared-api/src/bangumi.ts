import { initContract } from "@ts-rest/core";
import { z } from "zod";
import { BangumiModel } from "./generated/zod";

const c = initContract();

export type Bangumi = z.infer<typeof BangumiModel>;
export const bangumiContract = c.router(
  {
    get: {
      method: "GET",
      path: "/",
      responses: {
        200: z.array(BangumiModel),
      },
    },
  },
  {
    pathPrefix: "/bangumis",
  }
);
