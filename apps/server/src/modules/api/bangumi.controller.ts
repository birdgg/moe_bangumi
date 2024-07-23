import { Controller } from "@nestjs/common";
import { contract } from "@repo/api";
import { TsRestHandler, tsRestHandler } from "@ts-rest/nest";
import { BangumiService } from "../database/bangumi.service";

@Controller()
export class BangumiController {
	constructor(private bangumiService: BangumiService) {}

	@TsRestHandler(contract.bangumi)
	async handle() {
		return tsRestHandler(contract.bangumi, {
			get: async () => {
				const bangumis = await this.bangumiService.findAll();
				return {
					status: 200,
					body: bangumis,
				};
			},
		});
	}
}
