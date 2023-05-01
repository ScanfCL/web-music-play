import { BsFillPlusSquareFill } from 'react-icons/bs';
import { FiHome, FiSearch } from 'react-icons/fi';
import { Playlist } from '../Playlist/Playlist';
import { usePlaylistContext } from '../../contexts/PlaylistContext';
import { PlaylistMusic } from '../PlaylistMusic/PlaylistMusic';
import { PlayerMusic } from '../PlayerMusic/PlayerMusic';
import { useMutation } from 'react-query';
import { useState } from 'react';
import { playlistService } from '../../services';
import { useSearchContext } from '../../contexts/SearchContext';
import { Search } from '../Search/Search';

export const Home = () => {
  const { setSelectPlaylistId } = usePlaylistContext();
  const { isSearching, setIsSearching } = useSearchContext();
  const [input, setInput] = useState('');

  const { mutate } = useMutation(
    ({ name }: { name: string }) => playlistService.createPlaylist({ name }),
    {
      onSuccess: () => {
        window.alert('Create playlist successfully');
        setInput('');
      },
      onError: () => {
        window.alert('Create playlist failed');
      },
    },
  );

  return (
    <div className="relative">
      <div className="text-[50px] mb-[16px]">Take Home Music Play</div>
      <div className="bg-black max-w-[1500px] w-full max-h-[700px] h-[700px] grid grid-cols-8">
        <div className="text-white col-span-3 p-[16px] h-full">
          <div
            className="h-[40px] flex items-center text-[14px] my-[8px] cursor-pointer"
            onClick={() => {
              setSelectPlaylistId('');
              setIsSearching(false);
            }}
          >
            <FiHome className="w-[24px] h-[24px] mr-[16px]" />
            Home
          </div>
          <div
            className="h-[40px] flex items-center text-[14px] my-[8px] cursor-pointer"
            onClick={() => setIsSearching(true)}
          >
            <FiSearch className="w-[24px] h-[24px] mr-[16px]" /> Search
          </div>
          <label
            className="h-[40px] flex items-center text-[14px] my-[8px] cursor-pointer"
            htmlFor="my-modal"
          >
            <BsFillPlusSquareFill className="w-[24px] h-[24px] mr-[16px]" />
            Create Playlist
          </label>
          <input type="checkbox" id="my-modal" className="modal-toggle" />
          <div className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-lg">Create Playlist</h3>
              <p className="py-4">
                <input
                  type="text"
                  placeholder="Type name"
                  value={input}
                  className="input input-bordered input-accent w-full max-w-xs"
                  onChange={(e) => setInput(e.target.value)}
                />
              </p>
              <div className="modal-action">
                <label
                  htmlFor="my-modal"
                  className="btn"
                  onClick={() => setInput('')}
                >
                  Cancel
                </label>
                <label
                  htmlFor="my-modal"
                  className="btn btn-primary"
                  onClick={() => mutate({ name: input })}
                >
                  Add
                </label>
              </div>
            </div>
          </div>
          <div className="w-full border-bottom border-solid border-[0.5px] border-[#282828]" />
          <div>
            <Playlist />
          </div>
        </div>
        <div className="text-white col-span-5 bg-[#1a1a1a] max-h-[700px] h-full overflow-y-scroll">
          {isSearching ? <Search /> : <PlaylistMusic />}
        </div>
      </div>
      <div className="col-span-8 sticky w-full h-[100px] bottom-[0px] left-[0px] bg-[#222222] flex items-center justify-center">
        <PlayerMusic />
      </div>
    </div>
  );
};
