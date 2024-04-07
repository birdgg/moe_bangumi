export type Sub = 'CHS' | 'CHT' | 'JP';

export interface Bangumi {
  id: string;
  titleZh: string;
  titleJp?: string;
  titleEn?: string;
  poster?: string;
  year?: number;
  season: number;
  episodes?: Episode[];
  isCompleted: boolean;
  savePath: string;
  createdAt: Date;
  updatedAt: Date;
  deleted: boolean;
}

export interface Episode {
  id: string;
  BangumiId: string;
  episode: number;
  // webdl | bdrip
  source?: string;
  dpi: string;
  torrent: string;
  savePath: string;
  createdAt: Date;
  updatedAt: Date;
  deleted: boolean;
}
