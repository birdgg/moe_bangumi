import { initContract } from "@ts-rest/core";
import { bangumiContract } from "./bangumi";
import {  settingContract } from "./setting";

const c = initContract();

export const contract = c.router(
	{
		setting: settingContract,
		bangumi: bangumiContract,
	},
	{
		pathPrefix: "/api",
		strictStatusCodes: true,
	},
);
