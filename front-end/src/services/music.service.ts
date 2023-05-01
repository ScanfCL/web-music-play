import { ApiService } from './api.service';
import { Pagination } from './types';

export type Music = {
  id: number;
  title: string;
  artist: string;
  album: string;
  duration: number;
  musicUrl: string;
  createdDate: string;
};

export class MusicService {
  constructor(private apiService: ApiService) {}

  async getListMusic({
    page,
    perPage,
    search,
  }: Pagination & { search?: string }) {
    return this.apiService.get<Music[]>('/musics', { page, perPage, search });
  }
}
