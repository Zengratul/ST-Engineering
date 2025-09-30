import { BrowserRouter as Router, Routes, Route, useNavigate, useParams } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Character } from '@/types';
import { HomePage } from '@/pages/HomePage';
import { CharacterPage } from '@/pages/CharacterPage';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

// Character Detail Route Component
const CharacterDetailRoute = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const characterId = parseInt(id || '0', 10);

  const handleBack = () => {
    navigate('/');
  };

  return <CharacterPage characterId={characterId} onBack={handleBack} />;
};

// Home Route Component
const HomeRoute = () => {
  const navigate = useNavigate();

  const handleCharacterClick = (character: Character) => {
    navigate(`/character/${character.id}`);
  };

  return <HomePage onCharacterClick={handleCharacterClick} />;
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomeRoute />} />
            <Route path="/character/:id" element={<CharacterDetailRoute />} />
            <Route
              path="*"
              element={
                <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                  <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">404 - Page Not Found</h1>
                    <p className="text-gray-600 mb-4">The page you're looking for doesn't exist.</p>
                    <a
                      href="/"
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Go Home
                    </a>
                  </div>
                </div>
              }
            />
          </Routes>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
