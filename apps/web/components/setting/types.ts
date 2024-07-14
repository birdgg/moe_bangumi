import type { Setting } from "@repo/api/setting";

export interface SettingFormProps<K extends keyof Setting> {
	defaultValues: Setting[K];
}
