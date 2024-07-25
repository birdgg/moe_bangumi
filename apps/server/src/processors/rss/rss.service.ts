import { HttpService } from "@/processors/http/http.service";
import { RawTorrent } from "@/types/torrent.type";
import { getErrorMessage } from "@/utils/error";
import { Injectable, Logger } from "@nestjs/common";
import { XMLParser } from "fast-xml-parser";
import { RssParseResult } from "./rss.types";

@Injectable()
export class RssService {
	logger = new Logger(RssService.name);
	xmlParser = new XMLParser({
		ignoreAttributes: false,
		attributeNamePrefix: "",
	});
	constructor(private http: HttpService) {}

	async request(url: string): Promise<RawTorrent[]> {
		const response = await this.http
			.get<string>(url, {
				responseType: "text",
			})
			.catch((e) => {
				this.logger.error(
					`Failed to fetch rss url: ${url} \n ${getErrorMessage(e)}`,
				);
			});
		if (!response) return [];
		const parseResult = this.xmlParser.parse(response.data, true);

		return this.parse(parseResult.rss.channel);
	}

	private parse(data: RssParseResult): RawTorrent[] {
		const items = data.item;
		return items.map((item) => {
			const name = item.title;
			const url = item.enclosure ? item.enclosure.url : item.link;
			const homepage = item.enclosure ? item.link : "";
			return { name, url, homepage };
		});
	}
}
