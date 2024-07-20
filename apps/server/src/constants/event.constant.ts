import { getEventName } from "@/utils/event";

export const EVENT_LOG = "log";

export const EVENT_SETTING = "setting";
export const EVENT_SETTING_UPDATED = getEventName([EVENT_SETTING, "update"]);
