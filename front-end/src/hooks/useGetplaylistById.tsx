import { useQuery } from 'react-query';
import { playlistService } from '../services';

export const useGetPlaylistById = ({ playlistId }: { playlistId: string }) => {
  return useQuery(
    ['get-playlist', playlistId],
    () => playlistService.getPlaylist({ id: playlistId }),
    { enabled: playlistId !== '' },
  );
};
