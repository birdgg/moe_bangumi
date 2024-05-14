import { Injectable, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { QbittorrentService } from '../qbittorrent/qbittorrent.service';

@Injectable()
export class EpisodeService {
  private readonly logger = new Logger(EpisodeService.name);
  constructor(
    private prismaService: PrismaService,
    private qbittorrentService: QbittorrentService,
  ) {}

  async findOrCreate(
    bangumiId: number,
    torrent: string,
    data: Prisma.EpisodeUncheckedCreateInput,
  ) {
    let episode = await this.prismaService.episode.findUnique({
      where: {
        bangumiId_episode: { bangumiId: bangumiId, episode: data.episode },
      },
      include: { bangumi: true },
    });

    // if episode not exist, create and download episode
    if (!episode) {
      episode = await this.prismaService.episode.create({
        data: {
          ...data,
          bangumiId: bangumiId,
          torrent,
        },
        include: { bangumi: true },
      });

      this.qbittorrentService.addTorrent({
        urls: torrent,
        savepath: episode.bangumi.savePath,
      });
    }
    return episode;
  }
}
