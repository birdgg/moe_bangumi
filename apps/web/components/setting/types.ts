import type { Setting } from "@repo/shared-api";

export interface SettingFormProps<K extends keyof Setting> {
	defaultValues: Setting[K];
}
