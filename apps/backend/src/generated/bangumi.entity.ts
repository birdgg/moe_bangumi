import { Episode } from './episode.entity';

export class Bangumi {
  id?: number;
  nameZh?: string;
  nameJp?: string | null;
  nameEn?: string | null;
  poster?: string;
  season?: number;
  year?: number | null;
  isCompleted?: boolean;
  offset?: number;
  savePath?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deleted?: boolean;
  episode?: Episode[];
}
