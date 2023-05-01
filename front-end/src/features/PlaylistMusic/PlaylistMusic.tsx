import { useEffect, useMemo } from 'react';

import { MusicTable } from '../../components/MusicTable';
import { usePlaylistContext } from '../../contexts/PlaylistContext';
import { useGetListMusic } from '../../hooks/useGetListMusic';
import { useMenuContext } from '../../contexts/MenuContext';
import { useGetPlaylistById } from '../../hooks/useGetplaylistById';
import { useGetPlaylistMusic } from '../../hooks/useGetPlaylistMusic';
import { FaPlay } from 'react-icons/fa';
import { usePlayerContext } from '../../contexts/PlayerContext';

export const PlaylistMusic = () => {
  const { selectPlaylistId } = usePlaylistContext();
  const { handleClickMenu } = useMenuContext();
  const { handleSetMusics, load, musics: musicsState } = usePlayerContext();
  const { data: playlistMusics, isLoading: isLoadingPlaylistMusic } =
    useGetPlaylistMusic({
      playlistId: selectPlaylistId,
    });
  const { data: playlist, isLoading: isLoadingPlaylist } = useGetPlaylistById({
    playlistId: selectPlaylistId,
  });
  const { data: musics, isLoading: isLoadingMusics } = useGetListMusic();

  const musicsPlaylist = useMemo(
    () => playlistMusics?.map((t) => t.music) || [],
    [playlistMusics],
  );

  const handleClickPlayPlaylist = () => {
    handleSetMusics(musicsPlaylist);
    load(musicsPlaylist[0].musicUrl);
  };

  useEffect(() => {
    if (selectPlaylistId === '' && !musicsState?.length && musics?.length) {
      handleSetMusics(musics);
    }
  }, [handleSetMusics, musics, musicsState?.length, selectPlaylistId]);

  if (selectPlaylistId === '')
    return (
      <div className="h-full">
        {isLoadingMusics ? (
          <div>...loading</div>
        ) : (
          <MusicTable
            musics={musics || []}
            onContextMenuRow={handleClickMenu}
          />
        )}
      </div>
    );

  return (
    <div className="h-full">
      <div>
        {isLoadingPlaylist ? (
          <div>...loading</div>
        ) : (
          <div className="p-[16px] flex">
            <div className="w-[200px] h-[200px] bg-black">
              <img
                src="/images/apple-music-note.jpeg"
                className="h-[200px] w-auto object-cover"
              />
            </div>
            <div className="text-[48px] p-[16px] text-left">
              <div>{playlist?.name}</div>
              <button
                className="btn btn-circle"
                onClick={handleClickPlayPlaylist}
              >
                {<FaPlay />}
              </button>
            </div>
          </div>
        )}
      </div>
      {isLoadingPlaylistMusic ? (
        <div>...loading</div>
      ) : (
        <MusicTable
          musics={musicsPlaylist}
          onContextMenuRow={handleClickMenu}
        />
      )}
    </div>
  );
};
