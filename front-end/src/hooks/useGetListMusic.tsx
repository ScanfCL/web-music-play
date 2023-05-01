import { useQuery } from 'react-query';
import { musicService } from '../services';

export const useGetListMusic = (params?: { search?: string }) => {
  return useQuery(['get-list-music', params?.search], () =>
    musicService.getListMusic({
      page: 1,
      perPage: 100,
      search: params?.search,
    }),
  );
};
