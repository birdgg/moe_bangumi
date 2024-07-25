import { Injectable, Logger } from "@nestjs/common";
import { Bangumi } from "@prisma/client";
import { BangumiService } from "../database/bangumi.service";

@Injectable()
export class CollectorService {
	logger = new Logger(CollectorService.name);

	constructor(private bangumi: BangumiService) {}

	async epsComplete() {
		const bangumis = await this.bangumi.findEpsCompleteList();
		if (bangumis.length === 0) return;
		for (const bangumi of bangumis) {
			await this.collectSeason(bangumi);
		}
		this.bangumi.updateEpsComplete(bangumis.map((bangumi) => bangumi.id));
	}

	async collectSeason(bangumi: Bangumi) {
		this.logger.log(
			`Start collecting ${bangumi.nameRaw} Season ${bangumi.season}`,
		);
	}
}
