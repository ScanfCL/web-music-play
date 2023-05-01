import { useEffect, useState } from 'react';

import { MusicTable } from '../../components/MusicTable';
import { useSearchContext } from '../../contexts/SearchContext';
import { useGetListMusic } from '../../hooks/useGetListMusic';
import { useMenuContext } from '../../contexts/MenuContext';

function useDebounce<T>(value: T, delay?: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

export const Search = () => {
  const { search, setSearch } = useSearchContext();
  const { handleClickMenu } = useMenuContext();
  const debounceSearch = useDebounce<string>(search, 500);

  const { data: musics } = useGetListMusic({
    search: debounceSearch,
  });

  return (
    <div className="p-[16px]">
      <input
        type="text"
        placeholder="Search music"
        className="input input-bordered input-primary w-full max-w-xs"
        onChange={(e) => setSearch(e.target.value)}
      />
      <MusicTable musics={musics || []} onContextMenuRow={handleClickMenu} />
    </div>
  );
};
