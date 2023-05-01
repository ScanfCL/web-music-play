import { useMutation } from 'react-query';
import { playlistMusicService } from '../services';

export const useMutateAddMusicToPlaylist = () => {
  return useMutation(playlistMusicService.addMusicToPlaylist);
};
