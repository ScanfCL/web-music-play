import { MusicService } from './music.service';
import { ApiService } from './api.service';
import { PlaylistService } from './playlist.service';
import { PlaylistMusicService } from './playlistMusic.service';

export const apiService = new ApiService(
  process.env.API_URL || 'http://localhost:3000',
);

export const musicService = new MusicService(apiService);
export const playlistService = new PlaylistService(apiService);
export const playlistMusicService = new PlaylistMusicService(apiService);
