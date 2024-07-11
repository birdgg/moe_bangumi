import { SettingService } from '@/modules/setting/setting.service';
import { Injectable, Logger } from '@nestjs/common';
import RssParser from 'rss-parser';
// import { BangumiService } from '../bangumi/bangumi.service';
import { rawParser } from '../parser/analyser/rawParser';

@Injectable()
export class MikanService {
  private readonly logger = new Logger(MikanService.name);
  private readonly rssParser = new RssParser();

  constructor(
    private readonly settingService: SettingsService,
    private readonly bangumiService: BangumiService,
  ) {}

  fetchRss() {
    this.rssParser.parseURL(this._getRssUrl(), (_, feed) => {
      this._processRss(feed.items);
    });
  }

  private _getRssUrl() {
    return `https://mikanani.me/RSS/MyBangumi?token=${this.settingService.get().general.mikanToken}`;
  }

  private async _processRss(items: RssParser.Item[]) {
    for (let index = 0; index < items.length; index++) {
      const item = items[index];
      if (!item.title) continue;
      try {
        const { episodeNum, ...bangumiData } = rawParser(item.title);
        // const bangumi = await this.bangumiService.findOrCreate(
        //   bangumiData,
        //   item.link || '',
        // );
      } catch (e) {
        this.logger.error(e);
      }
    }
  }
}
