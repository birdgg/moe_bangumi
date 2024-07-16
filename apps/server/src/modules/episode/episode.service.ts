import { isDataCreated } from "@/utils/database";
import { Injectable, Logger } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { Mutex } from "async-mutex";
import { PrismaService } from "nestjs-prisma";
import { PathAnalyserService } from "../analyser/path-analyser.service";
import { DownloaderService } from "../downloader/downloader.service";
import { SettingService } from "../setting/setting.service";

@Injectable()
export class EpisodeService {
	logger = new Logger(EpisodeService.name);
	constructor(
		private prismaService: PrismaService,
		private downloaderService: DownloaderService,
		private settingService: SettingService,
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
		this.logger.log(
			`Create new episode ${episode.bangumi.nameZh} ${episode.num}`,
		);

		const savePath = this.pathAnalyserService.getSavePath(episode);
		this.logger.log(`Downloading ${episode.bangumi.nameZh} to ${savePath}`);
		this.downloaderService.addTorrent(episode.torrent, savePath);
	}
}
