import { useMemo } from 'react';
import { PlaylistMusic } from '../services/playlistMusic.service';

interface PlaylistMusicTableProps {
  playlistMusics: PlaylistMusic[];
}

export const PlaylistMusicTable = ({
  playlistMusics,
}: PlaylistMusicTableProps) => {
  const musics = useMemo(
    () => playlistMusics.map((t) => t.music),
    [playlistMusics],
  );

  return (
    <div>
      <div className="grid grid-cols-10 py-[16px] px-[8px]">
        <div className="col-span-1">#</div>
        <div className="col-span-3">Name</div>
        <div className="col-span-3">Album</div>
        <div className="col-span-2">Date Release</div>
        <div className="col-span-1">Time</div>
      </div>
      {musics?.map((music, index) => (
        <div
          key={music.id}
          className="flex items-center w-full cursor-pointer hover:bg-[#282828]"
        >
          <div className="grid grid-cols-10 py-[8px] px-[8px]">
            <div className="col-span-1 flex justify-center items-center">
              {index + 1}
            </div>
            <div className="col-span-3">
              {' '}
              <div className="text-[16px] text-left">
                <div className="max-w-[180px] whitespace-nowrap overflow-hidden text-ellipsis">
                  {music.title}
                </div>
                <div className="text-[14px] text-[#b3b3b3]">{music.artist}</div>
              </div>
            </div>
            <div className="col-span-3">{music.album}</div>
            <div className="col-span-2">{music.createdDate}</div>
            <div className="col-span-1">{music.duration}</div>
          </div>
        </div>
      ))}
    </div>
  );
};
