import { Injectable, Logger } from "@nestjs/common";
import type { Prisma } from "@prisma/client";
import type { PrismaService } from "nestjs-prisma";
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
		return this.prismaService.bangumi.create({
			data: {
				...data,
				poster,
			},
		});
	}
}
