import { Injectable } from "@nestjs/common";
import type { Prisma } from "@prisma/client";
import type { PrismaService } from "nestjs-prisma";

@Injectable()
export class EpisodeService {
	constructor(private prismaService: PrismaService) {}

	async create(data: Prisma.EpisodeUncheckedCreateInput) {
		return this.prismaService.episode.create({
			data,
		});
	}
}
