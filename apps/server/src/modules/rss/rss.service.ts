import { Injectable, Logger } from "@nestjs/common";
import { XMLParser } from "fast-xml-parser";
import { HttpService } from "../http/http.service";

@Injectable()
export class RssService {
	logger = new Logger(RssService.name);
	xmlParser = new XMLParser({
		ignoreAttributes: false,
		attributeNamePrefix: "",
	});
	constructor(private http: HttpService) {}

	async parse(url: string) {
		const response = await this.http.axiosRef
			.get(url, {
				responseType: "text",
			})
			.catch((e) => {
				this.logger.error(`Fetch rss url failed: ${url}`);
			});
		if (!response) return;
		const parseResult = this.xmlParser.parse(response.data, true);
		return parseResult.rss.channel;
	}
}
