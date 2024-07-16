import { contract } from "@repo/api";
import { type ClientInferResponseBody, initClient } from "@ts-rest/core";

export const client = initClient(contract, {
	baseUrl:
		process.env.NODE_ENV === "development" ? "http://localhost:3001" : "",
	baseHeaders: {},
	throwOnUnknownStatus: true,
});
