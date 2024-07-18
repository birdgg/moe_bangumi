import { isDev } from "./env.constant";

export const SERVER_URL = isDev ? "http://localhost:3001" : "";
export const POSTER_PREFIX_URL = `${SERVER_URL}/posters`;
