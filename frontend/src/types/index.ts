// Character interface matching backend
export interface Character {
  id: number;
  name: string;
  title: string;
  family: string;
  image: string;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface CharactersResponse {
  success: boolean;
  data: Character[];
  total: number;
}

export interface CharacterResponse {
  success: boolean;
  data: Character;
}

// Search form types
export interface SearchFormData {
  query: string;
}

// Store types
export interface CharacterStore {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  clearSearch: () => void;
}

// Error types
export interface ApiError {
  message: string;
  statusCode: number;
  code?: string;
}
