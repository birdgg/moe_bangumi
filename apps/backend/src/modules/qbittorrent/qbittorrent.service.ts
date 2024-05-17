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
    const { downloader } = this.settingService.getSetting();
    try {
      this.qbittorrentClient = new Qbittorent(
        downloader.host,
        downloader.username,
        downloader.password,
      );
      await this.qbittorrentClient.login();
      this.logger.debug(`Downloader service setup`);
    } catch (e) {
      this.logger.error(e);
    }
  }

  isConnected() {
    return this.qbittorrentClient.isConnected;
  }

  async addTorrent(data: TorrentOptions) {
    this.logger.debug(`Add torrent ${data.urls} to qbittorent`);
    return this.qbittorrentClient.addTorrent({
      ...data,
      category: this.CATEGORY,
    });
  }

  async getCompletedTorrentList() {
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
