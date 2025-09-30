import { create } from 'zustand';
import { CharacterStore } from '@/types';

/**
 * Zustand store for character-related state
 */
export const useCharacterStore = create<CharacterStore>((set) => ({
  searchQuery: '',
  setSearchQuery: (query: string) => set({ searchQuery: query }),
  clearSearch: () => set({ searchQuery: '' }),
}));
