import ReactPlayer from 'react-player';
import { usePlayerContext } from '../../contexts/PlayerContext';
import { FaPlay, FaPause } from 'react-icons/fa';
import { TbPlayerTrackNextFilled } from 'react-icons/tb';
import { BsFillVolumeUpFill, BsFillVolumeDownFill } from 'react-icons/bs';
import { useGetListMusic } from '../../hooks/useGetListMusic';

export const PlayerMusic = () => {
  const {
    ref,
    duration,
    url,
    pip,
    playing,
    light,
    loop,
    playbackRate,
    volume,
    muted,
    played,
    handleProgress,
    handlePlayPause,
    handlePlay,
    handleEnablePIP,
    handleDisablePIP,
    handlePause,
    handleEnded,
    handleDuration,
    handleOnPlaybackRateChange,
    handleNextMusic,
    handlePreviousMusic,
    handleVolumeChange,
    handleSeekMouseDown,
    handleSeekChange,
    handleSeekMouseUp,
  } = usePlayerContext();

  const { data: musics } = useGetListMusic();

  const musicPlaying = musics?.find((music) => music.musicUrl === url);

  function pad(n: number) {
    return ('0' + n).slice(-2);
  }

  function format(seconds: number) {
    const date = new Date(seconds * 1000);
    const hh = date.getUTCHours();
    const mm = date.getUTCMinutes();
    const ss = pad(date.getUTCSeconds());
    if (hh) {
      return `${hh}:${pad(mm)}:${ss}`;
    }
    return `${mm}:${ss}`;
  }

  return (
    <div className="flex w-full">
      <div className="flex-1 p-[16px] flex text-left">
        <div className="min-w-[50px] w-[50px] min-h-[50px] h-[50px] bg-slate-500">
          <img
            src="/images/image-cover.webp"
            className="min-w-[50px] w-[50px] min-h-[50px] h-[50px] object-cover"
          />
        </div>
        <div className="ml-[8px] flex flex-col justify-center">
          <div className="text-[14px]">{musicPlaying?.title}</div>
          <div className="text-[12px] text-gray-400">
            {musicPlaying?.artist}
          </div>
        </div>
      </div>
      <ReactPlayer
        ref={ref}
        key={url}
        className="react-player hidden"
        width="100%"
        height="100%"
        url={url || ''}
        pip={pip}
        playing={playing}
        light={light}
        loop={loop}
        playbackRate={playbackRate}
        volume={volume}
        muted={muted}
        onReady={() => console.log('onReady')}
        onStart={() => console.log('onStart')}
        onPlay={handlePlay}
        onEnablePIP={handleEnablePIP}
        onDisablePIP={handleDisablePIP}
        onPause={handlePause}
        onBuffer={() => console.log('onBuffer')}
        onPlaybackRateChange={handleOnPlaybackRateChange}
        onSeek={(e) => console.log('onSeek', e)}
        onEnded={handleEnded}
        onError={(e) => console.log('onError', e)}
        onProgress={handleProgress}
        onDuration={handleDuration}
      />
      <div className="flex flex-col items-center justify-center flex-1">
        <div className="w-full flex items-center justify-center">
          <button className="btn btn-circle" onClick={handlePreviousMusic}>
            <TbPlayerTrackNextFilled className="rotate-180" />
          </button>
          <button className="btn btn-circle" onClick={handlePlayPause}>
            {playing ? <FaPause /> : <FaPlay />}
          </button>
          <button className="btn btn-circle" onClick={handleNextMusic}>
            <TbPlayerTrackNextFilled />
          </button>
        </div>
        <div className="flex items-center space-x-[4px]">
          <div> {format(duration * played)}</div>
          <input
            type="range"
            min={0}
            max={0.999999}
            step="any"
            value={played}
            onMouseDown={handleSeekMouseDown}
            onChange={handleSeekChange}
            onMouseUp={handleSeekMouseUp}
            className="w-[300px]"
          />{' '}
          <div>{format(duration * (1 - played))}</div>
        </div>
      </div>
      <div className="flex-1 flex items-center px-[16px]">
        <div className="w-full flex items-center justify-end">
          <BsFillVolumeDownFill className="w-[24px] h-[24px]" />
          <input
            type="range"
            min={0}
            max={1}
            step="any"
            value={volume}
            onChange={handleVolumeChange}
          />
          <BsFillVolumeUpFill className="w-[24px] h-[24px]" />
        </div>
      </div>
    </div>
  );
};
