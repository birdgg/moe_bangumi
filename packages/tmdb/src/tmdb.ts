import fetch from "cross-fetch";
import type {
	DiscoverTVQuery,
	Language,
	ListQueryResult,
	SeasonDetail,
	TV,
	TVDetail,
} from "./types";

const TMDB_URL = "https://api.themoviedb.org/3";

export class TMDBApi {
	private apiKey: string;
	public language: Language = "en-US";

	constructor(apiKey: string, language: Language = "en-US") {
		this.apiKey = apiKey;
		this.language = language;
	}

	async discoverTv(query: DiscoverTVQuery): Promise<ListQueryResult<TV>> {
		return this.makeRequest("/discover/tv", query);
	}

	async tv(id: number): Promise<TVDetail> {
		return this.makeRequest(`/tv/${id}`);
	}

	async season(id: number, season: number): Promise<SeasonDetail> {
		return this.makeRequest(`/tv/${id}/season/${season}`);
	}

	private async makeRequest(
		path: string,
		query?: Record<string, any>,
	): Promise<any> {
		const searchQuery = new URLSearchParams(query);
		searchQuery.set("api_key", this.apiKey);
		searchQuery.set("language", this.language);
		const response = await fetch(
			`${TMDB_URL}${path}?${searchQuery.toString()}`,
			{
				headers: {
					accept: "application/json",
				},
			},
		);
		return response.json();
	}
}

export class TMDBImage {
	static getImageUrl(path: string, width = 500) {
		return `https://image.tmdb.org/t/p/w${width}${path}`;
	}
}
