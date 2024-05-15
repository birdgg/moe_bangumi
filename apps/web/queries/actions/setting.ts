"use server";
import { revalidatePath } from "next/cache";
import { bangumiClient } from "../api";
import type { components } from "../generatedApi";

export async function updateSetting(
  data: components["schemas"]["UpdateSettingDto"]
) {
  const res = await bangumiClient.PATCH("/api/setting", {
    body: data,
  });

  revalidatePath("/setting");

  return res.data;
}
