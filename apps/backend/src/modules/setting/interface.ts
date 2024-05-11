export interface Setting {
  program: {
    rssTime: number;
    renameTime: number;
    webuiPort: number;
  };
  downloader: {
    host: string;
    username: string;
    password: string;
    path: string;
  };
}
