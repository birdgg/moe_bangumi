import { isDataCreated } from "@/utils/database";
import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { Mutex } from "async-mutex";
import { PrismaService } from "nestjs-prisma";

@Injectable()
export class EpisodeService {
	episodeMutex = new Mutex();
	constructor(private prismaService: PrismaService) {}

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
		const episode = await this.episodeMutex.runExclusive(async () => {
			return this.prismaService.episode.upsert({
				where: {
					bangumi_episode: query,
				},
				create: data,
				update: {},
			});
		});
		const isCreated = isDataCreated(episode);

		if (isCreated) {
			// add to qbittorrent
		}
	}
}
