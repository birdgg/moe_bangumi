import { Injectable, Logger } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "nestjs-prisma";
import { PathAnalyserService } from "../analyser/path-analyser.service";
import { DownloaderService } from "../downloader/downloader.service";

@Injectable()
export class EpisodeService {
	logger = new Logger(EpisodeService.name);
	constructor(
		private prismaService: PrismaService,
		private downloaderService: DownloaderService,
		private pathAnalyserService: PathAnalyserService,
	) {}

	async create(data: Prisma.EpisodeUncheckedCreateInput) {
		return this.prismaService.episode.create({
			data,
		});
	}

	async find(data: Prisma.EpisodeBangumi_episodeCompoundUniqueInput) {
		return this.prismaService.episode.findUnique({
			where: {
				bangumi_episode: data,
			},
		});
	}

	async findOrCreate(
		query: Prisma.EpisodeBangumi_episodeCompoundUniqueInput,
		data: Prisma.EpisodeUncheckedCreateInput,
	) {
		let episode = await this.prismaService.episode.findUnique({
			where: {
				bangumi_episode: query,
			},
			include: { bangumi: true },
		});
		if (episode) return;
		episode = await this.prismaService.episode.create({
			data,
			include: { bangumi: true },
		});

		const savePath = this.pathAnalyserService.getSavePath(episode);
		this.downloaderService.addTorrent(episode.torrent, savePath);
	}
}
