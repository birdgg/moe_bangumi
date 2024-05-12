import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { QbittorrentService } from '../qbittorrent/qbittorrent.service';
import { Torrent, TorrentContent } from 'src/libs/qbittorent/interface';
import * as path from 'path';
import { SettingService } from '../setting/setting.service';
import { torrentParser } from 'src/libs/parser/analyser/torrentParser';
import { getEpisodeName } from 'src/libs/parser/analyser/pathParser';

@Injectable()
export class RenameService {
  private readonly logger = new Logger(RenameService.name);
  private readonly mediaType = ['.mp4', '.mkv'];

  constructor(
    private qbittorrentService: QbittorrentService,
    private settingService: SettingService,
  ) {}

  // @Cron(CronExpression.EVERY_10_SECONDS)
  // handleCron() {
  //   this.rename();
  // }

  async rename() {
    this.logger.debug('Renaming job');
    const torrents = await this.qbittorrentService.getTorrentList();
    this.logger.debug(torrents);
    torrents.forEach(async (torrent) => {
      const contents = await this.qbittorrentService.getTorrentContents(
        torrent.hash,
      );
      this.logger.debug(contents);
      this._rename(torrent, contents);
    });
  }

  private _rename(torrent: Torrent, contents: TorrentContent[]) {
    const { mediaFiles, subFiles } = this.checkFiles(contents);
    if (mediaFiles.length === 0) return;

    // rename single episode
    if (mediaFiles.length === 1) {
      const newPath = this.genNewFilePath(
        torrent.save_path,
        mediaFiles[0].name,
      );
      this.qbittorrentService.renameTorrent(
        torrent.hash,
        mediaFiles[0].name,
        newPath,
      );
    } else {
    }
  }

  private checkFiles(files: TorrentContent[]) {
    const mediaExt = ['.mp4', '.mkv'];
    const subExt = ['.ass', '.srt'];
    const mediaFiles = [],
      subFiles = [];

    files.forEach((file) => {
      const fileExt = path.extname(file.name.toLowerCase());
      if (mediaExt.includes(fileExt)) {
        mediaFiles.push(file);
      } else if (subExt.includes(fileExt)) {
        subFiles.push(file);
      }
    });
    return { mediaFiles, subFiles };
  }

  private genNewFilePath(path: string, file: string) {
    const baseSavePath = this.settingService.getSetting().downloader.path;

    const [bangumi, seasonString] = path
      .slice(baseSavePath.length + 1)
      .split('/');
    const season = seasonString.match(/[Ss]eason (\d+)/)[1];
    const episode = torrentParser(file);
    return getEpisodeName(bangumi, parseInt(season), episode);
  }
}
