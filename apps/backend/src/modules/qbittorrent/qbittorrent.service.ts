import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Qbittorent } from 'src/libs/qbittorent';
import { TorrentOptions } from 'src/libs/qbittorent/interface';

@Injectable()
export class QbittorrentService implements OnModuleInit {
  private readonly logger = new Logger(QbittorrentService.name);
  private qbittorrentClient: Qbittorent;

  constructor(private configService: ConfigService) {
    this.qbittorrentClient = new Qbittorent(
      this.configService.get('QBITTORRENT_URL'),
      this.configService.get('QBITTORRENT_USERNAME'),
      this.configService.get('QBITTORRENT_PASSWORD'),
    );
  }

  onModuleInit() {
    this.qbittorrentClient.login();
  }

  addTorrent(data: TorrentOptions) {
    this.logger.log(`[Downloader]: add torrent ${data.urls}`);
    return this.qbittorrentClient.addTorrent(data);
  }
}
