import { ClientInferResponseBody, initClient } from "@ts-rest/core";
import { contract } from "@repo/shared-api";

export const client = initClient(contract, {
  baseUrl: "http://localhost:3001",
  baseHeaders: {},
  throwOnUnknownStatus: true,
});

export type Bangumi = ClientInferResponseBody<
  typeof contract.bangumi.get,
  200
>[0];
