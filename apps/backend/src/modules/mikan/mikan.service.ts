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
import {
  getEpisodeName,
  getSavePath,
} from 'src/libs/parser/analyser/pathParser';
import { Bangumi } from '@prisma/client';
import { SettingService } from '../setting/setting.service';

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
    private settingService: SettingService,
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
          savePath: getSavePath(
            this.getBaseSavePath(),
            item.nameZh,
            item.season,
          ),
        },
      });
    }
    await this.updateToEpisode(bangumi, item, torrent);
  }

  private async updateToEpisode(
    bangumi: Bangumi,
    item: RawParserResult,
    torrent: string,
  ) {
    const episode = await this.prismaService.episode.findUnique({
      where: {
        bangumiId_episode: { bangumiId: bangumi.id, episode: item.episode },
      },
    });
    // already downloaded
    if (episode) return;
    await this.prismaService.episode.create({
      data: {
        bangumiId: bangumi.id,
        name: getEpisodeName(item.nameZh, item.season, item.episode),
        ...pick(item, ['sub', 'source', 'dpi']),
        episode: item.episode,
        torrent,
      },
    });

    this.qbittorrentService.addTorrent({
      urls: torrent,
      savepath: bangumi.savePath,
    });
  }

  private getBaseSavePath() {
    return this.settingService.getConfig().downloader.path;
  }
}
