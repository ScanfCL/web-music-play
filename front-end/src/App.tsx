import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

import './App.css';
import { Home } from './features/Home/Home';
import { PlaylistProvider } from './contexts/PlaylistContext';
import { MenuProvider } from './contexts/MenuContext';
import { PlayerProvider } from './contexts/PlayerContext';
import { SearchProvider } from './contexts/SearchContext';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SearchProvider>
        <PlaylistProvider>
          <MenuProvider>
            <PlayerProvider>
              <Home />
            </PlayerProvider>
          </MenuProvider>
        </PlaylistProvider>
      </SearchProvider>
    </QueryClientProvider>
  );
}

export default App;
