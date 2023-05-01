import { createContext, useContext, useRef, useState } from 'react';
import { Music } from '../services/music.service';

export type IPlayerContext = {
  ref: React.MutableRefObject<any>;
  url: string | null;
  pip: boolean;
  playing: boolean;
  controls: boolean;
  light: boolean;
  volume: number;
  muted: boolean;
  played: number;
  loaded: number;
  duration: number;
  playbackRate: number;
  loop: boolean;
  seeking: boolean;
  musics: Music[];
  load: (url: string) => void;
  handlePlayPause: () => void;
  handleStop: () => void;
  handleToggleControls: () => void;
  handleToggleLight: () => void;
  handleToggleLoop: () => void;
  handleVolumeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleToggleMuted: () => void;
  handleSetPlaybackRate: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleTogglePIP: () => void;
  handlePlay: () => void;
  handleEnablePIP: () => void;
  handleDisablePIP: () => void;
  handlePause: () => void;
  handleProgress: (params: { loaded: number; played: number }) => void;
  handleEnded: () => void;
  handleDuration: (duration: number) => void;
  handleOnPlaybackRateChange: (speed: string) => void;
  handleSetMusics: (musics: Music[]) => void;
  handleNextMusic: () => void;
  handlePreviousMusic: () => void;
  handleSeekMouseDown: () => void;
  handleSeekChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSeekMouseUp: (
    e: React.MouseEvent<HTMLInputElement, MouseEvent>,
  ) => void;
};

const PlayerContext = createContext<IPlayerContext | null>(null);

export const PlayerProvider = ({ children }: React.PropsWithChildren) => {
  const ref = useRef(null);
  const [url, setUrl] = useState<string | null>(null);
  const [pip, setPip] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [controls, setControls] = useState(false);
  const [light, setLight] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [muted, setMuted] = useState(false);
  const [played, setPlayed] = useState(0);
  const [loaded, setLoaded] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [loop, setLoop] = useState(false);
  const [seeking, setSeeking] = useState(false);
  const [musics, setMusics] = useState<Music[]>([]);

  const load = (url: string) => {
    setUrl(url);
    setPlayed(0);
    setLoaded(0);
    setPip(false);
  };

  const handlePlayPause = () => {
    setPlaying((prev) => !prev);
  };

  const handleStop = () => {
    setUrl(null);
    setPlaying(false);
  };

  const handleToggleControls = () => {
    // set(
    //   {
    //     controls: !this.state.controls,
    //     url: null,
    //   },
    //   () => this.load(url),
    // );
    // setControls((prev) => !prev);
    // setUrl((prev) => {
    //   load(prev);
    //   return null;
    // });
  };

  const handleToggleLight = () => {
    setLight((prev) => !prev);
  };

  const handleToggleLoop = () => {
    setLoop((prev) => !prev);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.target.value));
  };

  const handleToggleMuted = () => {
    setMuted((prev) => !prev);
  };

  const handleSetPlaybackRate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlaybackRate(parseFloat(e.target.value));
  };

  const handleOnPlaybackRateChange = (speed: string) => {
    setPlaybackRate(parseFloat(speed));
  };

  const handleTogglePIP = () => {
    setPip((prev) => !prev);
  };

  const handlePlay = () => {
    console.log('onPlay');
    setPlaying(true);
  };

  const handleEnablePIP = () => {
    console.log('onEnablePIP');
    setPip(true);
  };

  const handleDisablePIP = () => {
    console.log('onDisablePIP');
    setPip(false);
  };

  const handlePause = () => {
    console.log('onPause');
    setPlaying(false);
  };

  const handleEnded = () => {
    console.log('onEnded');
    setPlaying(loop);
  };

  const handleDuration = (duration: number) => {
    setDuration(duration);
  };

  const handleProgress = (params: { loaded: number; played: number }) => {
    if (!seeking) {
      setPlayed(params.played);
      setLoaded(params.loaded);
    }
  };

  const handleSetMusics = (musics: Music[]) => {
    setMusics(musics);
  };

  const handleNextMusic = () => {
    const index = musics.findIndex((music) => music.musicUrl === url);
    if (index === musics.length - 1) {
      setUrl(musics[0].musicUrl);
    } else {
      setUrl(musics[index + 1].musicUrl);
    }
  };

  const handlePreviousMusic = () => {
    const index = musics.findIndex((music) => music.musicUrl === url);
    if (index === 0) {
      setUrl(musics[musics.length - 1].musicUrl);
    } else {
      setUrl(musics[index - 1].musicUrl);
    }
  };

  const handleSeekMouseDown = () => {
    setSeeking(true);
  };

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayed(parseFloat(e.target.value));
  };

  const handleSeekMouseUp = (
    e: React.MouseEvent<HTMLInputElement, MouseEvent>,
  ) => {
    setSeeking(false);
    (ref.current as any).seekTo(parseFloat((e.target as any).value));
  };

  return (
    <PlayerContext.Provider
      value={{
        ref,
        url,
        pip,
        playing,
        controls,
        light,
        volume,
        muted,
        played,
        loaded,
        duration,
        playbackRate,
        loop,
        seeking,
        musics,
        load,
        handlePlayPause,
        handleStop,
        handleToggleControls,
        handleToggleLight,
        handleToggleLoop,
        handleVolumeChange,
        handleToggleMuted,
        handleSetPlaybackRate,
        handleTogglePIP,
        handlePlay,
        handleEnablePIP,
        handleDisablePIP,
        handlePause,
        handleProgress,
        handleEnded,
        handleDuration,
        handleOnPlaybackRateChange,
        handleSetMusics,
        handleNextMusic,
        handlePreviousMusic,
        handleSeekMouseDown,
        handleSeekChange,
        handleSeekMouseUp,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayerContext = () => {
  return useContext(PlayerContext) as IPlayerContext;
};
