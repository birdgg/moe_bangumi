import { ApiProperty } from '@nestjs/swagger';

class Program {
  @ApiProperty()
  rssTime: number;

  @ApiProperty()
  renameTime: number;

  @ApiProperty()
  mikanToken: string;
}

class Downloader {
  @ApiProperty()
  host: string;
  @ApiProperty()
  username: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  path: string;
}

export class UpdateSettingDto {
  program?: Program;
  downloader?: Downloader;
}

export class Setting {
  program: Program;
  downloader: Downloader;
}
