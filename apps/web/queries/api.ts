import createClient from "openapi-fetch";
import type { paths } from "./generatedApi";

export const bangumiClient = createClient<paths>({
  baseUrl: process.env.NEXT_PUBLIC_BACKEND,
});
