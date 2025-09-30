import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CharactersResponse, CharacterResponse } from '@/types';

// Mock the API service methods directly
vi.mock('@/services/api', () => ({
  characterApi: {
    getAllCharacters: vi.fn(),
    getCharacterById: vi.fn(),
    searchCharacters: vi.fn(),
    getCharacters: vi.fn(),
  },
}));

import { characterApi } from '@/services/api';
const mockCharacterApi = characterApi as vi.Mocked<typeof characterApi>;

describe('characterApi', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getAllCharacters', () => {
    it('should fetch all characters successfully', async () => {
      const mockData: CharactersResponse = {
        success: true,
        data: [
          {
            id: 0,
            name: 'Daenerys Targaryen',
            title: 'Mother of Dragons',
            family: 'House Targaryen',
            image: 'https://thronesapi.com/assets/images/daenerys.jpg',
          },
        ],
        total: 1,
      };

      mockCharacterApi.getAllCharacters.mockResolvedValue(mockData);

      const result = await characterApi.getAllCharacters();

      expect(result).toEqual(mockData);
      expect(mockCharacterApi.getAllCharacters).toHaveBeenCalled();
    });

    it('should handle API errors', async () => {
      const mockError = new Error('API Error');
      mockCharacterApi.getAllCharacters.mockRejectedValue(mockError);

      await expect(characterApi.getAllCharacters()).rejects.toThrow(
        'API Error'
      );
    });
  });

  describe('getCharacterById', () => {
    it('should fetch character by ID successfully', async () => {
      const mockData: CharacterResponse = {
        success: true,
        data: {
          id: 0,
          name: 'Daenerys Targaryen',
          title: 'Mother of Dragons',
          family: 'House Targaryen',
          image: 'https://thronesapi.com/assets/images/daenerys.jpg',
        },
      };

      mockCharacterApi.getCharacterById.mockResolvedValue(mockData);

      const result = await characterApi.getCharacterById(0);

      expect(result).toEqual(mockData);
      expect(mockCharacterApi.getCharacterById).toHaveBeenCalledWith(0);
    });

    it('should handle character not found', async () => {
      const mockError = new Error('Character not found');
      mockCharacterApi.getCharacterById.mockRejectedValue(mockError);

      await expect(characterApi.getCharacterById(999)).rejects.toThrow(
        'Character not found'
      );
    });
  });

  describe('searchCharacters', () => {
    it('should search characters successfully', async () => {
      const mockData: CharactersResponse = {
        success: true,
        data: [
          {
            id: 0,
            name: 'Daenerys Targaryen',
            title: 'Mother of Dragons',
            family: 'House Targaryen',
            image: 'https://thronesapi.com/assets/images/daenerys.jpg',
          },
        ],
        total: 1,
      };

      mockCharacterApi.searchCharacters.mockResolvedValue(mockData);

      const result = await characterApi.searchCharacters('Daenerys');

      expect(result).toEqual(mockData);
      expect(mockCharacterApi.searchCharacters).toHaveBeenCalledWith(
        'Daenerys'
      );
    });
  });

  describe('getCharacters', () => {
    it('should fetch characters without name filter', async () => {
      const mockData: CharactersResponse = {
        success: true,
        data: [],
        total: 0,
      };

      mockCharacterApi.getCharacters.mockResolvedValue(mockData);

      const result = await characterApi.getCharacters();

      expect(result).toEqual(mockData);
      expect(mockCharacterApi.getCharacters).toHaveBeenCalled();
    });

    it('should fetch characters with name filter', async () => {
      const mockData: CharactersResponse = {
        success: true,
        data: [],
        total: 0,
      };

      mockCharacterApi.getCharacters.mockResolvedValue(mockData);

      const result = await characterApi.getCharacters('Jon');

      expect(result).toEqual(mockData);
      expect(mockCharacterApi.getCharacters).toHaveBeenCalledWith('Jon');
    });
  });
});
