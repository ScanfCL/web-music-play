import { ApiService } from './api.service';
import { Pagination } from './types';

export type Playlist = {
  id: string;
  name: string;
};

export class PlaylistService {
  constructor(private apiService: ApiService) {}

  async createPlaylist({ name }: { name: string }) {
    return this.apiService.post('/playlist', { name });
  }

  async getListPlaylist({ page, perPage }: Pagination) {
    return this.apiService.get<Playlist[]>('/playlists', { page, perPage });
  }

  async getPlaylist({ id }: { id: string }) {
    return this.apiService.get<Playlist>(`/playlist/${id}`);
  }

  async removePlaylist({ id }: { id: string }) {
    return this.apiService.delete(`/playlist/${id}`);
  }
}
