import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { config } from '@/config';
import { CharactersResponse, CharacterResponse, ApiError } from '@/types';

/**
 * Axios instance with base configuration
 */
const api: AxiosInstance = axios.create({
  baseURL: config.apiBaseUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log(`Making request to: ${config.baseURL}${config.url}`);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    console.error('API Error:', error.response?.status, error.response?.data);

    const apiError: ApiError = {
      message: error.response?.data?.error || 'An error occurred',
      statusCode: error.response?.status || 500,
      code: error.response?.data?.code,
    };

    return Promise.reject(apiError);
  }
);

/**
 * API service for character operations
 */
export const characterApi = {
  /**
   * Get all characters
   */
  getAllCharacters: async (): Promise<CharactersResponse> => {
    const response = await api.get<CharactersResponse>('/characters');
    return response.data;
  },

  /**
   * Get a single character by ID
   */
  getCharacterById: async (id: number): Promise<CharacterResponse> => {
    const response = await api.get<CharacterResponse>(`/characters/${id}`);
    return response.data;
  },

  /**
   * Search characters by name
   */
  searchCharacters: async (query: string): Promise<CharactersResponse> => {
    const response = await api.get<CharactersResponse>(
      `/characters/search?q=${encodeURIComponent(query)}`
    );
    return response.data;
  },

  /**
   * Get characters with optional name filter
   */
  getCharacters: async (name?: string): Promise<CharactersResponse> => {
    const params = name ? { name } : {};
    const response = await api.get<CharactersResponse>('/characters', {
      params,
    });
    return response.data;
  },
};

export default api;
