import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class EpisodeService {
  constructor(private prismaService: PrismaService) {}

  async create(data: Prisma.EpisodeUncheckedCreateInput) {
    return this.prismaService.episode.create({
      data,
    });
  }
}
