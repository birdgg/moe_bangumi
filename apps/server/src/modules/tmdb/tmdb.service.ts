import { Injectable } from '@nestjs/common';

const TMDB_URL = 'https://api.themoviedb.org/3';

@Injectable()
export class TMDBService {
  searchTv(query: string) {}
}
