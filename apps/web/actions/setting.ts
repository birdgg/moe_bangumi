'use server'
import { client } from "@/libs/client";
import { Setting } from '@repo/shared-api'

export async function updateSetting(setting: Partial<Setting>) {
  const { status, body } = await client.setting.post({ body: setting })
  return { status, body }
}