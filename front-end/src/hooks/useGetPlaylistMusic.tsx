import { useQuery } from 'react-query';
import { playlistMusicService } from '../services';

export const useGetPlaylistMusic = ({ playlistId }: { playlistId: string }) => {
  return useQuery(
    ['get-playlist-music', playlistId],
    () =>
      playlistMusicService.getListPlaylistMusic({
        playlistId,
        page: 1,
        perPage: 10,
      }),
    {
      enabled: playlistId !== '',
    },
  );
};
