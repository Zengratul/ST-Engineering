import { useState, useEffect } from 'react';
import { useSearchCharacters, useCharacters } from '@/hooks/useCharacters';
import { useCharacterStore } from '@/store/characterStore';
import { Character } from '@/types';
import { CharacterList } from '@/components/CharacterList';
import { SearchForm } from '@/components/SearchForm';
import { LoadingSpinner } from '@/components/LoadingSpinner';

interface HomePageProps {
  onCharacterClick: (character: Character) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onCharacterClick }) => {
  const { searchQuery } = useCharacterStore();
  const [searchTerm, setSearchTerm] = useState(searchQuery);

  // Use search query when there's a search term, otherwise use all characters
  const {
    data: searchData,
    isLoading: isSearchLoading,
    error: searchError,
  } = useSearchCharacters(searchTerm);

  const {
    data: allData,
    isLoading: isAllLoading,
    error: allError,
  } = useCharacters();

  // Determine which data to use
  const hasSearchTerm = searchTerm && searchTerm.trim().length > 0;
  const isLoading = hasSearchTerm ? isSearchLoading : isAllLoading;
  const error = hasSearchTerm ? searchError : allError;
  const characters = hasSearchTerm ? searchData?.data || [] : allData?.data || [];

  const handleSearch = (query: string) => {
    setSearchTerm(query);
  };

  useEffect(() => {
    setSearchTerm(searchQuery);
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Game of Thrones Explorer
            </h1>
            <p className="text-lg text-gray-600">
              Discover characters from the Seven Kingdoms
            </p>
          </div>

          {/* Search Form */}
          <div className="flex justify-center">
            <SearchForm onSearch={handleSearch} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Results Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">
                {hasSearchTerm ? `Search Results for "${searchTerm}"` : 'All Characters'}
              </h2>
              <p className="text-gray-600 mt-1">
                {isLoading ? (
                  'Loading...'
                ) : (
                  `Found ${characters.length} character${characters.length !== 1 ? 's' : ''}`
                )}
              </p>
            </div>

            {isLoading && <LoadingSpinner size="md" />}
          </div>
        </div>

        {/* Character List */}
        <CharacterList
          characters={characters}
          onCharacterClick={onCharacterClick}
          loading={isLoading}
          error={error?.message}
        />
      </main>
    </div>
  );
};
