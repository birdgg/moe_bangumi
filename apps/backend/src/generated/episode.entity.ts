
import {Bangumi} from './bangumi.entity'


export class Episode {
  id?: number ;
name?: string ;
episode?: number ;
bangumiId?: number ;
bangumi!: Bangumi ;
torrent?: string ;
createdAt?: Date ;
updatedAt?: Date ;
deleted?: boolean ;
}
