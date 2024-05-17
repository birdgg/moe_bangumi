import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { QbittorrentService } from '../qbittorrent/qbittorrent.service';
import { Torrent, TorrentContent } from 'src/libs/qbittorent/interface';
import * as path from 'path';
import { torrentParser } from 'src/libs/parser/analyser/torrentParser';
import { getEpisodeName } from 'src/libs/parser/analyser/pathParser';
import { SettingService } from '../setting/setting.service';

@Injectable()
export class RenameService implements OnModuleInit {
  private readonly INTERVAL_JOB = 'rename';
  private readonly MIN_INTERVAL_TIME = 60 * 1000;
  private readonly logger = new Logger(RenameService.name);

  constructor(
    private qbittorrentService: QbittorrentService,
    private settingService: SettingService,
    private schedulerRegistry: SchedulerRegistry,
  ) {}

  onModuleInit() {
    this.setup();
  }

  setup() {
    // clear existing interval
    let intervalTime =
      this.settingService.getSetting().program.renameTime * 1000;
    intervalTime =
      intervalTime < this.MIN_INTERVAL_TIME
        ? this.MIN_INTERVAL_TIME
        : intervalTime;

    try {
      this.schedulerRegistry.deleteInterval(this.INTERVAL_JOB);
    } catch (e) {}

    const interval = setInterval(() => this.rename(), intervalTime);
    this.schedulerRegistry.addInterval(this.INTERVAL_JOB, interval);
  }

  async rename() {
    const torrents = await this.qbittorrentService.getCompletedTorrentList();
    torrents.forEach(async (torrent) => {
      const contents = await this.qbittorrentService.getTorrentContents(
        torrent.hash,
      );
      this._rename(torrent, contents);
    });
  }

  private _rename(torrent: Torrent, contents: TorrentContent[]) {
    const { mediaFiles, subFiles } = this.checkFiles(contents);
    if (mediaFiles.length === 0) return;
    // TODO: rename collection
    if (mediaFiles.length > 1) return;

    // TODO: rename subfile
    // rename single episode
    const { bangumi, season, episode, ext } = this.getFileInfo(
      torrent.save_path,
      mediaFiles[0].name,
    );
    const newPath = `${getEpisodeName(bangumi, season, episode)}${ext}`;

    // has renamed
    if (mediaFiles[0].name === newPath) {
      return;
    }

    this.qbittorrentService.renameTorrent(
      torrent.hash,
      mediaFiles[0].name,
      newPath,
    );
    this.logger.debug(`Rename ${mediaFiles[0].name} to ${newPath}`);
  }

  /**
   * split files to mediaFiles and subFiles
   */
  private checkFiles(files: TorrentContent[]) {
    const mediaExt = ['.mp4', '.mkv'];
    const subExt = ['.ass', '.srt'];
    const mediaFiles = [],
      subFiles = [];

    files
      .filter((file) => file.progress === 1)
      .forEach((file) => {
        const fileExt = path.extname(file.name.toLowerCase());
        if (mediaExt.includes(fileExt)) {
          mediaFiles.push(file);
        } else if (subExt.includes(fileExt)) {
          subFiles.push(file);
        }
      });
    return { mediaFiles, subFiles };
  }

  private getFileInfo(filePath: string, file: string) {
    this.logger.debug({ filePath, file });
    const baseSavePath = this.settingService.getSetting().downloader.path;

    const [bangumi, seasonString] = filePath
      .slice(baseSavePath.length + 1)
      .split('/');
    const season = parseInt(seasonString.match(/[Ss]eason (\d+)/)[1]);
    const episode = torrentParser(file);
    const ext = path.extname(file);
    return { bangumi, season, episode, ext };
  }
}
