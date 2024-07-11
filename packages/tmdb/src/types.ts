export type Language = "zh-CN" | "ja-JP" | "en-US";

export interface ListQueryResult<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface DiscoverTVQuery {
  page?: number;
  include_adult?: boolean;
  with_text_query?: string;
  with_genres?: number;
}

export interface TV {
  audlt: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  first_air_date: string;
  name: string;
  vote_average: number;
  vote_count: number;
}

export interface TVDetail {
  id: number;
  name: string;
  original_language: string;
  original_name: string;
  poster_path: string;
  first_air_date: string;
  last_air_date: string;
  seasons: {
    air_date: string;
    epoisode_count: number;
    id: number;
    overview: string;
    poster_path: string;
    season_number: number;
    vote_average: number;
  }[];
}

export interface SeasonDetail {
  air_date: string;
  id: number;
  episodes: any[];
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
}
