export interface RssParseResult {
	title: string;
	item: {
		title: string;
		link: string;
		enclosure?: {
			url: string;
		};
	}[];
}
