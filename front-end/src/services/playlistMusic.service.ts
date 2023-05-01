import { ApiService } from './api.service';
import { Music } from './music.service';
import { Pagination } from './types';

export type PlaylistMusic = {
  id: string;
  musicId: string;
  playlistId: string;
  music: Music;
};

export class PlaylistMusicService {
  constructor(private apiService: ApiService) {}

  async getListPlaylistMusic({
    playlistId,
    page,
    perPage,
  }: { playlistId: string } & Pagination) {
    return this.apiService.get<PlaylistMusic[]>(
      `/playlist-music/${playlistId}`,
      {
        page,
        perPage,
      },
    );
  }

  async addMusicToPlaylist({
    playlistId,
    musicId,
  }: {
    playlistId: string;
    musicId: string;
  }) {
    return this.apiService.post(`/playlist-music`, { musicId, playlistId });
  }

  async deleteMusicFromPlaylist({
    playlistId,
    musicId,
  }: {
    playlistId: string;
    musicId: string;
  }) {
    return this.apiService.post('/playlist-music-delete', {
      musicId,
      playlistId,
    });
  }
}
