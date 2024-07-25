import { Bangumi, Prisma, Torrent } from "@prisma/client";

/** torrents from rss link */
export interface RawTorrent {
	homepage?: string;
	name: string;
	url: string;
}

export type TorrentCreateInput = Prisma.TorrentUncheckedCreateInput & {
	bangumi: Bangumi;
};
