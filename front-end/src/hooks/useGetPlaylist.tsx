import { useQuery } from 'react-query';

import { playlistService } from '../services';

export const useGetPlaylist = () => {
  return useQuery(['get-playlist'], () =>
    playlistService.getListPlaylist({ page: 1, perPage: 10 }),
  );
};
