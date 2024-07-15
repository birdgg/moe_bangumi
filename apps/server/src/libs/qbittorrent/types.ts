export interface QbittorrentParams {
	host: string;
	username: string;
	password: string;
}
export interface TorrentOptions {
	urls: string;
	savepath: string;
	category?: string;
	/** split tag by , */
	tags?: string;
}

export interface TorrentListOptions {
	filter?: "all" | "downloading" | "completed";
	category?: string;
	tag?: string;
}

export interface Torrent {
	name: string;
	content_path: string;
	save_path: string;
	hash: string;
}

export interface TorrentContent {
	name: string;
	progress: number;
}
