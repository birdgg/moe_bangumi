import { Controller } from "@nestjs/common";
import { contract } from "@repo/api";
import { TsRestHandler, tsRestHandler } from "@ts-rest/nest";
import { SettingService } from "./setting.service";

@Controller()
export class SettingController {
	constructor(private readonly setting: SettingService) {}

	@TsRestHandler(contract.setting)
	async handler() {
		return tsRestHandler(contract.setting, {
			get: async () => {
				return {
					status: 200,
					body: this.setting.get(),
				};
			},
			post: async ({ body }) => {
				return {
					status: 200,
					body: this.setting.update(body),
				};
			},
		});
	}
}
