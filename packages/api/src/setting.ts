import { initContract } from "@ts-rest/core";
import { z } from "zod";

const c = initContract();

export const SettingSchema = z.object({
	mikan: z.object({
		token: z.string().min(1),
	}),
	downloader: z.object({
		host: z.string().min(1),
		username: z.string().min(1),
		password: z.string().min(1),
		savePath: z.string(),
	}),
});

export type Setting = z.infer<typeof SettingSchema>;

export const settingContract = c.router(
	{
		get: {
			method: "GET",
			path: "/",
			responses: {
				200: SettingSchema,
			},
		},
		post: {
			method: "POST",
			path: "/",
			responses: {
				200: SettingSchema,
			},
			body: SettingSchema.partial(),
		},
	},
	{
		pathPrefix: "/setting",
	},
);
