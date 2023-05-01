import { createContext, useContext, useState } from 'react';

export type ISearchContext = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  isSearching: boolean;
  setIsSearching: React.Dispatch<React.SetStateAction<boolean>>;
};

const SearchContext = createContext<ISearchContext | null>(null);

export const SearchProvider = ({ children }: React.PropsWithChildren) => {
  const [search, setSearch] = useState<string>('');
  const [isSearching, setIsSearching] = useState<boolean>(false);

  return (
    <SearchContext.Provider
      value={{ search, setSearch, isSearching, setIsSearching }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => {
  return useContext(SearchContext) as ISearchContext;
};
