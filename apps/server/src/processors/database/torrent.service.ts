import { RawTorrent, TorrentCreateInput } from "@/types/torrent.type";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma.service";

@Injectable()
export class TorrentService {
	constructor(private prisma: PrismaService) {}

	createMany(data: TorrentCreateInput[]) {
		const list = data.map(({ bangumi, ...rest }) => ({ ...rest }));
		return this.prisma.torrent.createMany({
			data: list,
		});
	}

	async findNewTorrents(torrents: RawTorrent[]) {
		const newTorrents: RawTorrent[] = [];
		const oldTorrents = await this.prisma.torrent.findMany({
			select: { url: true },
		});
		for (const torrent of torrents) {
			if (oldTorrents.some((t) => t.url === torrent.url)) {
				continue;
			}
			newTorrents.push(torrent);
		}
		return newTorrents;
	}
}
