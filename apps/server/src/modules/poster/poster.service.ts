import * as fs from "node:fs";
import * as path from "node:path";
import { MIKAN_URL } from "@/modules/mikan/mikan.constant";
import { md5Hash } from "@/utils/crypto";
import { Injectable, Logger, type OnModuleInit } from "@nestjs/common";
import axios from "axios";
import * as cheerio from "cheerio";

const SAVE_PATH = path.join(process.cwd(), "/public/posters");

@Injectable()
export class PosterService implements OnModuleInit {
	private logger = new Logger(PosterService.name);

	onModuleInit() {
		if (!fs.existsSync(SAVE_PATH)) {
			fs.mkdirSync(SAVE_PATH, { recursive: true });
		}
	}

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

		if (fs.existsSync(path.join(SAVE_PATH, filename))) {
			return filename;
		}

		const response = await axios.get(url, {
			responseType: "stream",
		});
		const file = `${SAVE_PATH}/${filename}`;
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
