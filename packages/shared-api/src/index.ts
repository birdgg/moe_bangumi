import { type ServerInferResponses, initContract } from '@ts-rest/core';
// import { bangumiContract } from './bangumi';
import type { } from "@ts-rest/core";
import { SettingSchema, settingContract } from './setting';

const c = initContract();

export const contract = c.router(
	{
		setting: settingContract,
		// bangumi: bangumiContract,
	},
	{
		pathPrefix: '/api',
	},
);

export const schemas = {
	setting: SettingSchema,
};

export type ResponseShapes = ServerInferResponses<typeof contract>;

export type { Setting } from './setting';
