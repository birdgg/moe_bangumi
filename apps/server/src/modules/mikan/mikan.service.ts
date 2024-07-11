import { SettingService } from '@/modules/setting/setting.service';
import { Injectable, Logger } from '@nestjs/common';
import RssParser from 'rss-parser';
import { BangumiService } from '@/modules/bangumi/bangumi.service';
import { AnalyserService } from '@/modules/analyser/analyser.service';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class MikanService {
  private readonly logger = new Logger(MikanService.name);
  private readonly rssParser = new RssParser();

  constructor(
    private readonly settingService: SettingService,
    private readonly analyserService: AnalyserService,
    private readonly bangumiService: BangumiService,
  ) {}

  @Cron(
    process.env.NODE_ENV === 'development'
      ? CronExpression.EVERY_MINUTE
      : CronExpression.EVERY_HOUR,
    {
      name: 'MIKAN_RSS',
    },
  )
  fetchRss() {
    this.logger.log('Fetching Mikan RSS');
    this.rssParser.parseURL(this._getRssUrl(), (_, feed) => {
      this._processRss(feed.items);
    });
  }

  private _getRssUrl() {
    const mikanToken = this.settingService.get().general.mikanToken;
    if (!mikanToken) throw new Error('Mikan token not setted');
    return `https://mikanani.me/RSS/MyBangumi?token=${mikanToken}`;
  }

  private async _processRss(items: RssParser.Item[]) {
    for (let index = 0; index < items.length; index++) {
      const item = items[index];
      if (!item.title) continue;
      try {
        const { episodeNum, ...bangumiData } = this.analyserService.mikanTitle(
          item.title,
        );
        const bangumi = await this.bangumiService.findOrCreate(
          bangumiData,
          item.link || '',
        );
      } catch (e) {
        this.logger.error(e);
      }
    }
  }
}
