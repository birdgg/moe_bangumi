import { RssTorrent } from "@/types/torrent.type";
import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { SettingService } from "../setting/setting.service";
import { PrismaService } from "./prisma.service";

@Injectable()
export class BangumiService {
	constructor(
		private prisma: PrismaService,
		private setting: SettingService,
	) {}

	create(data: Omit<Prisma.BangumiUncheckedCreateInput, "needEpsCollect">) {
		return this.prisma.bangumi.create({
			data: {
				...data,
				needEpsCollect: this.setting.getBy("bangumiManager.epsComplete"),
			},
		});
	}

	createMany(data) {
		return this.prisma.bangumi.createMany({
			data,
		});
	}

	findAll() {
		return this.prisma.bangumi.findMany();
	}

	async findUnaddBangumi(
		torrents: RssTorrent[],
		rssLink: string,
	): Promise<RssTorrent[]> {
		const bangumis = await this.prisma.bangumi.findMany({
			select: { id: true, nameRaw: true, rssLink: true },
		});

		if (bangumis.length === 0) return torrents;

		const updateBangumis: { id: number; rssLink: string }[] = [];
		const findUnaddBangumi: RssTorrent[] = [];
		for (const torrent of torrents) {
			for (const bangumi of bangumis) {
				if (
					torrent.title.indexOf(bangumi.nameRaw) &&
					bangumi.rssLink.includes(torrent.url)
				) {
					updateBangumis.push({
						id: bangumi.id,
						rssLink: `${bangumi.rssLink},${rssLink}`,
					});
				} else {
					findUnaddBangumi.push(torrent);
				}
			}
		}

		await this.prisma.bulkUpdate("Bangumi", updateBangumis);
		return findUnaddBangumi;
	}

	findEpsCompleteList() {
		return this.prisma.bangumi.findMany({
			where: {
				needEpsCollect: true,
				isEpsCollected: false,
			},
		});
	}
}
