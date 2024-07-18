import { SERVER_URL } from "@/constants/url.constant";
import { initQueryClient } from "@/libs/ts-rest-react-query";
import { contract } from "@repo/api";

export const client = initQueryClient(contract, {
	baseUrl: SERVER_URL,
	baseHeaders: {},
	throwOnUnknownStatus: true,
});
