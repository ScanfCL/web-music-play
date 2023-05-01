import { createContext, useContext, useState } from 'react';

export type IPlaylistContext = {
  selectPlaylistId: string;
  setSelectPlaylistId: React.Dispatch<React.SetStateAction<string>>;
};

const PlaylistContext = createContext<IPlaylistContext | null>(null);

export const PlaylistProvider = ({ children }: React.PropsWithChildren) => {
  const [selectPlaylistId, setSelectPlaylistId] = useState<string>('');

  return (
    <PlaylistContext.Provider value={{ selectPlaylistId, setSelectPlaylistId }}>
      {children}
    </PlaylistContext.Provider>
  );
};

export const usePlaylistContext = () => {
  return useContext(PlaylistContext) as IPlaylistContext;
};
