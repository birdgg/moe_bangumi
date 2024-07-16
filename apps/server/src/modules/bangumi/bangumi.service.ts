import { Injectable, Logger } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "nestjs-prisma";
import { PosterService } from "../poster/poster.service";

@Injectable()
export class BangumiService {
	private logger = new Logger(BangumiService.name);
	constructor(
		private readonly prismaService: PrismaService,
		private readonly posterService: PosterService,
	) {}

	async findAll() {
		const bangumis = await this.prismaService.bangumi.findMany();
		return bangumis;
	}

	async findOrCreate(
		select: Prisma.BangumiName_seasonCompoundUniqueInput,
		data: Prisma.BangumiUncheckedCreateWithoutEpisodesInput,
		posterLink: string,
	) {
		const bangumi = await this.prismaService.bangumi.findUnique({
			where: { name_season: select },
		});
		if (bangumi) return bangumi;
		const poster = await this.posterService.getFromMikan(posterLink);
		this.logger.log(`Create new bangumi ${data.nameZh}`);
		return this.prismaService.bangumi.create({
			data: {
				...data,
				poster,
			},
		});
	}
}
