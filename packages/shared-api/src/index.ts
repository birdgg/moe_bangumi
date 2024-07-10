import { type ServerInferResponses, initContract } from '@ts-rest/core';
// import { bangumiContract } from './bangumi';
import { SettingSchema, settingContract } from './setting';

const c = initContract();

export const contract = c.router(
	{
		settings: settingContract,
		// bangumi: bangumiContract,
	},
	{
		pathPrefix: '/api',
	},
);

export const schemas = {
	settings: SettingSchema,
};

export type ResponseShapes = ServerInferResponses<typeof contract>;

export type { Setting } from './setting';
