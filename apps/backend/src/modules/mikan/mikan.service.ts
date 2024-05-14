import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import * as RssParser from 'rss-parser';
import { titleParser } from 'src/libs/parser/analyser/titleParser';
import { SettingService } from '../setting/setting.service';
import { OnEvent } from '@nestjs/event-emitter';
import { SETTING_CHANGED } from '../setting/setting.constant';
import { BangumisService } from '../bangumi/bangumis.service';
import { EpisodeService } from '../episode/episode.service';

@Injectable()
export class MikanService implements OnModuleInit {
  private readonly logger = new Logger(MikanService.name);
  private parser = new RssParser();
  public readonly JOB_NAME = 'mikan_rss';

  constructor(
    private schedulerRegistry: SchedulerRegistry,
    private settingService: SettingService,
    private bangumisService: BangumisService,
    private episodeService: EpisodeService,
  ) {}

  onModuleInit() {
    this.setupSubscribe();
  }

  @OnEvent(SETTING_CHANGED)
  handleSettingChanged() {
    this.setupSubscribe();
  }

  setupSubscribe() {
    // clear previous interval
    try {
      this.schedulerRegistry.deleteInterval(this.JOB_NAME);
    } catch (e) {}

    const { rssTime, mikanToken } = this.settingService.getSetting().program;

    if (!mikanToken) {
      this.logger.error('Mikan token is not set');
      return;
    }

    this.subscribeMikan(mikanToken);

    this.logger.log(`Set up mikan subscription with interval ${rssTime}`);
    const interval = setInterval(
      () => this.subscribeMikan(mikanToken),
      rssTime * 1000,
    );
    this.schedulerRegistry.addInterval(this.JOB_NAME, interval);
  }

  private subscribeMikan(token: string) {
    const mikanRssUrl = `https://mikanani.me/RSS/MyBangumi?token=${token}`;
    this.parser.parseURL(mikanRssUrl, (err, feed) => {
      this.processRss(feed.items);
    });
  }

  private async processRss(items: RssParser.Item[]) {
    for (let index = 0; index < items.length; index++) {
      const item = items[index];
      const result = titleParser(items[index].title);
      if (result.error) {
        this.logger.error(`Error parsing title: ${result.error}`);
        continue;
      }
      const bangumi = await this.bangumisService.findOrCreate(
        result.bangumi,
        item.link,
      );
      await this.episodeService.findOrCreate(
        bangumi.id,
        item.enclosure.url,
        result.episode,
      );
    }
  }
}
