import { initQueryClient } from "@/libs/ts-rest-react-query";
import { contract } from "@repo/api";

export const client = initQueryClient(contract, {
	baseUrl:
		process.env.NODE_ENV === "development" ? "http://localhost:3001" : "",
	baseHeaders: {},
	throwOnUnknownStatus: true,
});
