import * as fs from "node:fs";
import * as path from "node:path";
import { POSTER_DIR } from "@/constants/path.constant";
import { MIKAN_URL } from "@/modules/mikan/mikan.constant";
import { md5Hash } from "@/utils/crypto";
import { Injectable, Logger } from "@nestjs/common";
import axios from "axios";
import * as cheerio from "cheerio";

@Injectable()
export class PosterService {
	private logger = new Logger(PosterService.name);

	/**
	 *
	 * @param url Mikan bangumi detail url
	 * @returns poster filename
	 */
	async getFromMikan(url: string) {
		const response = await fetch(url);
		const html = await response.text();
		const $ = cheerio.load(html);
		const posterString = $(".bangumi-poster").attr("style")!;
		const matchedPoster = /url\('?(?<rawPoster>.*?)"?\)/i.exec(posterString);
		if (!matchedPoster?.groups?.rawPoster) return "";

		const poster = matchedPoster.groups.rawPoster.split("?")[0]!;
		const posterUrl = `${MIKAN_URL}${poster}`;
		const ext = path.extname(poster);

		return this.saveImage(posterUrl, ext);
	}

	private async saveImage(url: string, ext: string) {
		const filename = `${this.getHash(url)}${ext}`;
		const file = path.join(POSTER_DIR, filename);

		if (fs.existsSync(file)) return filename;

		const response = await axios.get(url, {
			responseType: "stream",
		});
		response.data.pipe(fs.createWriteStream(file));
		response.data.on("error", (err) => {
			this.logger.error(err);
		});
		response.data.on("end", () => {
			this.logger.debug(`Downloaded poster to ${filename}`);
		});
		return filename;
	}

	private getHash(url: string) {
		return md5Hash(url, { length: 8 });
	}
}
