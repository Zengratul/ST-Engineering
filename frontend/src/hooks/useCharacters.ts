import { useQuery } from '@tanstack/react-query';
import { characterApi } from '@/services/api';

/**
 * Hook to fetch all characters
 */
export const useCharacters = () => {
  return useQuery({
    queryKey: ['characters'],
    queryFn: () => characterApi.getAllCharacters(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });
};

/**
 * Hook to fetch a single character by ID
 */
export const useCharacter = (id: number) => {
  return useQuery({
    queryKey: ['character', id],
    queryFn: () => characterApi.getCharacterById(id),
    enabled: !isNaN(id) && id >= 0,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });
};

/**
 * Hook to search characters by query
 */
export const useSearchCharacters = (query: string) => {
  return useQuery({
    queryKey: ['characters', 'search', query],
    queryFn: () => characterApi.searchCharacters(query),
    enabled: query.trim().length > 0,
    staleTime: 2 * 60 * 1000, // 2 minutes
    retry: 2,
  });
};

/**
 * Hook to get characters with optional filtering
 */
export const useFilteredCharacters = (name?: string) => {
  return useQuery({
    queryKey: ['characters', 'filtered', name],
    queryFn: () => characterApi.getCharacters(name),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });
};
