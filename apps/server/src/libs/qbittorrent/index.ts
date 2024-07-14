import * as https from "node:https";
import { isDev } from "@/utils/env";
import axios, { type AxiosInstance } from "axios";
import { QbittorrentParams, TorrentListOptions, TorrentOptions } from "./types";

export class Qbittorent {
	private host: string;
	private username: string;
	private password: string;
	private sid = "";
	private axios!: AxiosInstance;
	isConnected = false;

	constructor({ host, username, password }: QbittorrentParams) {
		this.host = host;
		this.username = username;
		this.password = password;

		this.setup();
	}

	setup() {
		const axiosInstance = axios.create({
			baseURL: this.host,
		});
		axiosInstance.defaults.headers.post["Content-Type"] = "multipart/form-data";
		if (isDev()) {
			const httpsAgent = new https.Agent({ rejectUnauthorized: false });
			axiosInstance.defaults.httpsAgent = httpsAgent;
		}
		axiosInstance.interceptors.request.use(
			(config) => {
				const { url } = config;
				config.headers.Referer = this.host;
				config.headers.Host = this.host;
				if (this.sid) {
					config.headers.Cookie = `SID=${this.sid}`;
				}
				if (url) {
					config.url = `/api/v2/${url}`;
				}
				if (url !== "auth/login" && !this.sid) {
					throw new Error("[qbittorrent] not login");
				}
				return config;
			},
			(error: Error) => {
				return Promise.reject(error);
			},
		);

		this.axios = axiosInstance;
	}

	async login() {
		const response = await this.axios.post("auth/login", {
			username: this.username,
			password: this.password,
		});
		if (response.data === "Failed") {
			throw new Error("[qbittorrent] login failed");
		}
		// @ts-expect-error it just exist
		const sid = response.headers["set-cookie"][0].split(";")[0].split("=")[1];
		if (sid) {
			this.sid = sid;
			this.isConnected = true;
		}
		return response;
	}

	getVersion() {
		return this.axios.get("app/version");
	}

	// torrent
	addTorrent(data: TorrentOptions) {
		return this.axios.post("torrents/add", data);
	}

	getTorrentList(options: TorrentListOptions) {
		return this.axios.get("torrents/info", {
			params: options,
		});
	}

	getTorrentContents(hash: string) {
		return this.axios.get("torrents/files", {
			params: { hash },
		});
	}

	renameFile(data: { hash: string; oldPath: string; newPath: string }) {
		return this.axios.post("torrents/renameFile", data);
	}

	private makeRequest() {}
}
