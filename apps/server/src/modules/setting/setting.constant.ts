import { Setting } from "@repo/api/setting";

export const DEFAULT_SETTING: Setting = {
	mikan: {
		token: "enter your mikan token",
	},
	downloader: {
		host: "http://localhost:8989",
		username: "admin",
		password: "adminadmin",
		savePath: "/downloads",
	},
	bangumiManager: {
		epsComplete: false,
	},
};
