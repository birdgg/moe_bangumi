import { Injectable, Logger } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { PrismaService } from 'nestjs-prisma';
import * as RssParser from 'rss-parser';
import { MikanRssItem } from 'src/interfaces/response';
import { RawParserResult } from 'src/libs/parser/analyser/interface';
import { rawParser } from 'src/libs/parser/analyser/rawParser';
import { pick } from 'lodash';

@Injectable()
export class MikanService {
  private readonly logger = new Logger(MikanService.name);
  private parser = new RssParser();
  private readonly INTERVAL = 5;
  public readonly JOB_NAME = 'mikan';

  constructor(
    private schedulerRegistry: SchedulerRegistry,
    private prismaService: PrismaService,
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
      this.updateToBangumi(result, item.enclosure.url);
    }
  }

  private async updateToBangumi(item: RawParserResult, torrent: string) {
    let bangumi = await this.prismaService.bangumi.findUnique({
      where: { nameZh_season: { nameZh: item.nameZh, season: item.season } },
    });

    if (!bangumi) {
      bangumi = await this.prismaService.bangumi.create({
        data: {
          ...pick(item, ['nameZh', 'nameEn', 'season']),
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
    await this.prismaService.episode.create({
      data: {
        bangumiId,
        ...pick(item, ['sub', 'source', 'dpi']),
        episode: item.episode,
        torrent,
        savePath,
      },
    });
  }

  private getSavePath(item: RawParserResult) {
    return `/${item.nameZh}/Season ${item.season}/`;
  }
}
