export interface RssResponse {
	rss: {
		channel: {
			title: string;
			item: {
				title: string;
				link: string;
				enclosure?: {
					url: string;
				};
			}[];
		};
	};
}
