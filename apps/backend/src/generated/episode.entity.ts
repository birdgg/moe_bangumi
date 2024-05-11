
import {Bangumi} from './bangumi.entity'


export class Episode {
  id?: number ;
name?: string ;
bangumiId?: number ;
bangumi!: Bangumi ;
episode?: number ;
sub?: string ;
source?: string  | null;
dpi?: string ;
torrent?: string ;
createdAt?: Date ;
updatedAt?: Date ;
deleted?: boolean ;
}
