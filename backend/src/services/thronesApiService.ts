import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { ThronesCharacter } from '@/types';
import { config } from '@/config';
import { AppError } from '@/utils/errors';

/**
 * Service for interacting with ThronesAPI
 */
class ThronesApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: config.thronesApiBaseUrl,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add request interceptor for logging
    this.api.interceptors.request.use(
      (config) => {
        console.log(`Making request to: ${config.baseURL}${config.url}`);
        return config;
      },
      (error) => {
        console.error('Request error:', error);
        return Promise.reject(error);
      }
    );

    // Add response interceptor for error handling
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error(
          'API Error:',
          error.response?.status,
          error.response?.data
        );

        if (error.response?.status === 404) {
          throw new AppError('Character not found', 404, 'CHARACTER_NOT_FOUND');
        } else if (error.response?.status >= 500) {
          throw new AppError(
            'External API server error',
            502,
            'EXTERNAL_API_ERROR'
          );
        } else if (error.code === 'ECONNABORTED') {
          throw new AppError('Request timeout', 504, 'REQUEST_TIMEOUT');
        } else {
          throw new AppError(
            'Failed to fetch data from external API',
            502,
            'EXTERNAL_API_ERROR'
          );
        }
      }
    );
  }

  /**
   * Fetch all characters
   */
  async getAllCharacters(): Promise<ThronesCharacter[]> {
    try {
      const response: AxiosResponse<ThronesCharacter[]> = await this.api.get(
        '/Characters'
      );
      return response.data;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError(
        'Failed to fetch characters',
        502,
        'FETCH_CHARACTERS_ERROR'
      );
    }
  }

  /**
   * Fetch a single character by ID
   */
  async getCharacterById(id: number): Promise<ThronesCharacter> {
    try {
      const response: AxiosResponse<ThronesCharacter> = await this.api.get(
        `/Characters/${id}`
      );
      return response.data;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError(
        'Failed to fetch character',
        502,
        'FETCH_CHARACTER_ERROR'
      );
    }
  }

  /**
   * Search characters by name (client-side filtering)
   */
  async searchCharacters(query: string): Promise<ThronesCharacter[]> {
    try {
      const characters = await this.getAllCharacters();

      if (!query.trim()) {
        return characters;
      }

      const searchTerm = query.toLowerCase();
      return characters.filter((character) => {
        const fullName = character.fullName?.toLowerCase() || '';
        const firstName = character.firstName?.toLowerCase() || '';
        const lastName = character.lastName?.toLowerCase() || '';

        return (
          fullName.includes(searchTerm) ||
          firstName.includes(searchTerm) ||
          lastName.includes(searchTerm)
        );
      });
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError(
        'Failed to search characters',
        502,
        'SEARCH_CHARACTERS_ERROR'
      );
    }
  }
}

export const thronesApiService = new ThronesApiService();
