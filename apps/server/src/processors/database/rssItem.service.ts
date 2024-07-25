import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma.service";

@Injectable()
export class RssItemService {
	constructor(private prisma: PrismaService) {}

	findAll() {
		return this.prisma.rssItem.findMany();
	}

	async findByIdOrAll(id?: number) {
		if (id) {
			const rssItem = await this.prisma.rssItem.findUnique({ where: { id } });
			if (!rssItem) return [];
			return [rssItem];
		}
		return this.findAll();
	}

	findAggregateRss() {
		return this.prisma.rssItem.findMany({
			where: {
				aggregate: true,
				enabled: true,
			},
		});
	}
}
