import { Injectable, Logger } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { PrismaService } from 'nestjs-prisma';
import * as RssParser from 'rss-parser';
import { MikanRssItem } from 'src/interfaces/response.interface';
import { RawParserResult } from 'src/libs/parser/analyser/interface';
import { rawParser } from 'src/libs/parser/analyser/rawParser';
import { pick } from 'lodash';
import { QbittorrentService } from '../qbittorrent/qbittorrent.service';
import { mikanParser } from 'src/libs/parser/analyser/mikanParser';

@Injectable()
export class MikanService {
  private readonly logger = new Logger(MikanService.name);
  private parser = new RssParser();
  private readonly INTERVAL = 5;
  public readonly JOB_NAME = 'mikan';

  constructor(
    private schedulerRegistry: SchedulerRegistry,
    private prismaService: PrismaService,
    private qbittorrentService: QbittorrentService,
  ) {}

  addFeed(url: string) {
    const job = new CronJob(
      `${this.INTERVAL} * * * * *`,
      () => {
        this.parser.parseURL(url, (err, feed) => {
          // @ts-expect-error
          this.parseRssItems(feed.items);
        });
      },
      null,
      true,
    );

    this.schedulerRegistry.addCronJob(this.JOB_NAME, job);
    job.start();
  }

  private async parseRssItems(items: MikanRssItem[]) {
    for (let index = 0; index < items.length; index++) {
      const item = items[index];
      const result = rawParser(items[index].title);
      if (!result) continue;
      await this.updateToBangumi(result, item.enclosure.url, item.link);
    }
  }

  private async updateToBangumi(
    item: RawParserResult,
    torrent: string,
    link: string,
  ) {
    let bangumi = await this.prismaService.bangumi.findUnique({
      where: { nameZh_season: { nameZh: item.nameZh, season: item.season } },
    });

    if (!bangumi) {
      // save poster
      const { poster } = await mikanParser(link);
      bangumi = await this.prismaService.bangumi.create({
        data: {
          ...pick(item, ['nameZh', 'nameEn', 'season']),
          poster,
          savePath: this.getSavePath(item),
        },
      });
    }
    await this.updateToEpisode(bangumi.id, item, torrent);
  }

  private async updateToEpisode(
    bangumiId: number,
    item: RawParserResult,
    torrent: string,
  ) {
    const episode = await this.prismaService.episode.findUnique({
      where: { bangumiId_episode: { bangumiId, episode: item.episode } },
    });
    // already downloaded
    if (episode) return;
    const savePath = this.getSavePath(item);
    const name = `${item.nameZh} S${this.getNumber(item.season)}E${this.getNumber(item.episode)}`;
    await this.prismaService.episode.create({
      data: {
        bangumiId,
        name,
        ...pick(item, ['sub', 'source', 'dpi']),
        episode: item.episode,
        torrent,
        savePath,
      },
    });
    this.qbittorrentService.addTorrent({
      urls: torrent,
      savepath: savePath,
      rename: name,
    });
  }

  private getSavePath(item: RawParserResult) {
    return `/${item.nameZh}/Season ${item.season}/`;
  }

  private getNumber(n: number) {
    return n < 10 ? `0${n}` : n;
  }
}
