import { HttpService } from "@/modules/http/http.service";
import { RssTorrent } from "@/types/torrent.type";
import { Injectable, Logger } from "@nestjs/common";
import { XMLParser } from "fast-xml-parser";
import { RssResponse } from "./rss.types";
@Injectable()
export class RssService {
	logger = new Logger(RssService.name);
	xmlParser = new XMLParser({
		ignoreAttributes: false,
		attributeNamePrefix: "",
	});
	constructor(private http: HttpService) {}

	async request(url: string): Promise<RssTorrent[]> {
		const response = await this.http.axiosRef
			.get(url, {
				responseType: "text",
			})
			.catch((e) => {
				this.logger.error(`Failed to request url ${url}`);
			});
		if (!response) return [];

		return this.parse(response.data);
	}

	private parse(data: RssResponse): RssTorrent[] {
		const items = data.rss.channel.item;
		return items.map((item) => {
			const title = item.title;
			const url = item.enclosure ? item.enclosure.url : item.link;
			const homepage = item.enclosure ? item.link : "";
			return { title, url, homepage };
		});
	}
}
