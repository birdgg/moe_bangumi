"use server";
import { client } from "@/libs/client";
import type { Setting } from "../../../packages/api/dist/index.mjs";

export async function updateSetting(setting: Partial<Setting>) {
	const { status, body } = await client.setting.post({ body: setting });
	return { status, body };
}
