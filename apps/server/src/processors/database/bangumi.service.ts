import { BulkBangumi } from "@/types/bangumi.type";
import { RawTorrent, TorrentCreateInput } from "@/types/torrent.type";
import { Injectable } from "@nestjs/common";
import { Bangumi, Prisma, RssItem, Torrent } from "@prisma/client";
import { PrismaService } from "./prisma.service";

@Injectable()
export class BangumiService {
	constructor(private prisma: PrismaService) {}

	create(data: Prisma.BangumiUncheckedCreateInput) {
		return this.prisma.bangumi.create({ data });
	}

	createMany(data) {
		return this.prisma.bangumi.createMany({
			data,
		});
	}

	findAll() {
		return this.prisma.bangumi.findMany();
	}

	findEpsCompleteList() {
		return this.prisma.bangumi.findMany({
			where: {
				needEpsCollect: true,
				isEpsCollected: false,
			},
		});
	}

	hasEpisode(bangumi: Bangumi, episode: string) {
		return bangumi.episodes.split(",").includes(episode);
	}

	update(id: number, data: Prisma.BangumiUpdateInput) {
		return this.prisma.bangumi.update({
			where: { id },
			data,
		});
	}

	bulkUpdate(data: BulkBangumi[]) {
		return this.prisma.bulkUpdate("Bangumi", data);
	}
}
