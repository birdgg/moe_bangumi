import { type ClientInferResponseBody, initClient } from "@ts-rest/core";
import { contract } from "../../../../packages/api/dist/index.mjs";

export const client = initClient(contract, {
	baseUrl: "http://localhost:3001",
	baseHeaders: {},
	throwOnUnknownStatus: true,
});

export type Bangumi = ClientInferResponseBody<
	typeof contract.bangumi.get,
	200
>[0];
