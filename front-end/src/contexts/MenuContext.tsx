import React, { useState, useEffect, createContext, useContext } from 'react';
import { useGetPlaylist } from '../hooks/useGetPlaylist';
import { Music } from '../services/music.service';
import { useMutation } from 'react-query';
import { playlistMusicService } from '../services';
import { usePlaylistContext } from './PlaylistContext';

type IMenuContext = {
  clicked: boolean;
  setClicked: React.Dispatch<React.SetStateAction<boolean>>;
  points: { x: number; y: number };
  setPoints: React.Dispatch<
    React.SetStateAction<{
      x: number;
      y: number;
    }>
  >;
  handleClickMenu: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    music: Music,
  ) => void;
};

const MenuContext = createContext<IMenuContext | null>(null);

const ContextMenu = ({
  top,
  left,
  music,
}: {
  top: number;
  left: number;
  music?: Music | null;
}) => {
  const { selectPlaylistId } = usePlaylistContext();

  const { data: playlist } = useGetPlaylist();
  const { mutate } = useMutation(
    ({ playlistId, musicId }: { playlistId: string; musicId: string }) =>
      playlistMusicService.addMusicToPlaylist({ playlistId, musicId }),
    {
      onError: (error) => {
        window.alert(error);
      },
      onSuccess: () => {
        window.alert('Add music to playlist successfully');
      },
    },
  );

  const { mutate: mutateDeleteMusicFromPlaylist } = useMutation(
    ({ playlistId, musicId }: { playlistId: string; musicId: string }) =>
      playlistMusicService.deleteMusicFromPlaylist({ playlistId, musicId }),
    {
      onError: (error) => {
        window.alert(error);
      },
      onSuccess: () => {
        window.alert('Remove music from playlist successfully');
      },
    },
  );

  const handleAddMusicToPlaylist = (playlistId: string) => {
    if (music) {
      mutate({ playlistId, musicId: music.id.toString() });
    }
  };

  const handleRemoveMusicFromPlaylist = (playlistId: string) => {
    if (music) {
      mutateDeleteMusicFromPlaylist({
        playlistId,
        musicId: music.id.toString(),
      });
    }
  };

  return (
    <div className="fixed z-[100]" style={{ top, left }}>
      <ul className="menu bg-base-100 w-56">
        {playlist?.map((t) => {
          return selectPlaylistId === t.id ? (
            <li key={t.id} onClick={() => handleRemoveMusicFromPlaylist(t.id)}>
              {<a>Remove from {t.name}</a>}
            </li>
          ) : (
            <li key={t.id} onClick={() => handleAddMusicToPlaylist(t.id)}>
              {<a>Add to {t.name}</a>}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export const MenuProvider = ({ children }: React.PropsWithChildren) => {
  const [clicked, setClicked] = useState(false);
  const [points, setPoints] = useState({
    x: 0,
    y: 0,
  });
  const [music, setMusic] = useState<Music | null>();
  useEffect(() => {
    const handleClick = () => {
      setClicked(false);
      setMusic(null);
    };
    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, []);

  const handleClickMenu = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    music: Music,
  ) => {
    e.preventDefault();
    setClicked(true);
    setPoints({
      x: e.pageX,
      y: e.pageY,
    });
    setMusic(music);
  };

  return (
    <MenuContext.Provider
      value={{ clicked, setClicked, points, setPoints, handleClickMenu }}
    >
      {clicked && <ContextMenu top={points.y} left={points.x} music={music} />}
      {children}
    </MenuContext.Provider>
  );
};

export const useMenuContext = () => {
  return useContext(MenuContext) as IMenuContext;
};
