import { FaPause, FaPlay } from 'react-icons/fa';
import { format, secondsToMinutes } from 'date-fns';

import { usePlayerContext } from '../contexts/PlayerContext';
import { Music } from '../services/music.service';

interface MusicTableProps {
  musics: Music[];
  onContextMenuRow: (
    event: React.MouseEvent<HTMLDivElement>,
    music: Music,
  ) => void;
}

const padNumber = (str: string, pad: string) =>
  pad.substring(0, pad.length - str.length) + str;

export const MusicTable = ({ musics, onContextMenuRow }: MusicTableProps) => {
  const { url, load, playing, handlePlayPause } = usePlayerContext();

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
          className="cursor-pointer hover:bg-[#282828]"
          onContextMenu={(e) => onContextMenuRow(e, music)}
          onClick={() => {
            if (url === music.musicUrl) {
              handlePlayPause();
            } else {
              load(music.musicUrl);
            }
          }}
        >
          <div className="grid grid-cols-10 py-[8px] px-[8px]">
            <div className="col-span-1 flex justify-center items-center">
              {url === music.musicUrl ? (
                playing ? (
                  <FaPause />
                ) : (
                  <FaPlay />
                )
              ) : (
                index + 1
              )}
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
            <div className="col-span-2">
              {format(new Date(music.createdDate), 'd MMM Y')}
            </div>
            <div className="col-span-1">
              {secondsToMinutes(music.duration)}:
              {padNumber((music.duration % 60).toString(), '00')}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
