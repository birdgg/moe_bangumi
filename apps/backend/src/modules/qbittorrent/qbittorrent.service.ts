import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Qbittorent } from 'src/libs/qbittorent';
import { Torrent, TorrentOptions } from 'src/libs/qbittorent/interface';
import { SettingService } from '../setting/setting.service';

@Injectable()
export class QbittorrentService implements OnModuleInit {
  private readonly logger = new Logger(QbittorrentService.name);
  private readonly CATEGORY = 'bangumi';
  private qbittorrentClient: Qbittorent;

  constructor(private settingService: SettingService) {}

  async onModuleInit() {
    const { downloader } = this.settingService.getConfig();
    this.qbittorrentClient = new Qbittorent(
      downloader.host,
      downloader.username,
      downloader.password,
    );
  }

  async addTorrent(data: TorrentOptions) {
    this.logger.log(`[Downloader]: add torrent ${data.urls}`);
    return this.qbittorrentClient.addTorrent({
      ...data,
      category: this.CATEGORY,
    });
  }

  async getTorrentList() {
    const response = await this.qbittorrentClient.getTorrentList({
      filter: 'completed',
      category: this.CATEGORY,
    });
    return response.data as Torrent[];
  }

  async getTorrentContents(hash: string) {
    const response = await this.qbittorrentClient.getTorrentContents(hash);
    return response.data;
  }

  async renameTorrent(hash: string, oldPath: string, newPath: string) {
    const response = await this.qbittorrentClient.renameFile({
      hash,
      oldPath,
      newPath,
    });
    return response.data;
  }
}
