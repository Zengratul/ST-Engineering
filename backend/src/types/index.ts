// ThronesAPI Character interface
export interface ThronesCharacter {
  id: number;
  firstName: string;
  lastName: string;
  fullName: string;
  title: string;
  family: string;
  image: string;
  imageUrl: string;
}

// Transformed character for frontend
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

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  total?: number;
  page?: number;
  limit?: number;
}

// Error types
export interface ApiError {
  message: string;
  statusCode: number;
  code?: string;
}

// Search parameters
export interface CharacterSearchParams {
  name?: string;
  family?: string;
  page?: number;
  limit?: number;
}
