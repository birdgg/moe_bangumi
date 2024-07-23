import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";

@Injectable()
export class RssItemService {
	constructor(private prisma: PrismaService) {}

	findAggregateRss() {
		return this.prisma.rssItem.findMany({
			where: {
				aggregate: true,
			},
		});
	}
}
