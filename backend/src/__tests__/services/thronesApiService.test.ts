import { AppError } from '@/utils/errors';
import { ThronesCharacter } from '@/types';

// Mock the service methods directly
jest.mock('@/services/thronesApiService', () => ({
  thronesApiService: {
    getAllCharacters: jest.fn(),
    getCharacterById: jest.fn(),
    searchCharacters: jest.fn(),
  },
}));

import { thronesApiService } from '@/services/thronesApiService';
const mockThronesApiService = thronesApiService as jest.Mocked<
  typeof thronesApiService
>;

describe('ThronesApiService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllCharacters', () => {
    it('should fetch all characters successfully', async () => {
      const mockCharacters: ThronesCharacter[] = [
        {
          id: 0,
          firstName: 'Daenerys',
          lastName: 'Targaryen',
          fullName: 'Daenerys Targaryen',
          title: 'Mother of Dragons',
          family: 'House Targaryen',
          image: 'daenerys.jpg',
          imageUrl: 'https://thronesapi.com/assets/images/daenerys.jpg',
        },
      ];

      mockThronesApiService.getAllCharacters.mockResolvedValue(mockCharacters);

      const result = await thronesApiService.getAllCharacters();

      expect(result).toEqual(mockCharacters);
      expect(mockThronesApiService.getAllCharacters).toHaveBeenCalled();
    });

    it('should throw AppError when API request fails', async () => {
      const mockError = new AppError('Failed to fetch characters', 502);
      mockThronesApiService.getAllCharacters.mockRejectedValue(mockError);

      await expect(thronesApiService.getAllCharacters()).rejects.toThrow(
        AppError
      );
    });
  });

  describe('getCharacterById', () => {
    it('should fetch character by ID successfully', async () => {
      const mockCharacter: ThronesCharacter = {
        id: 0,
        firstName: 'Daenerys',
        lastName: 'Targaryen',
        fullName: 'Daenerys Targaryen',
        title: 'Mother of Dragons',
        family: 'House Targaryen',
        image: 'daenerys.jpg',
        imageUrl: 'https://thronesapi.com/assets/images/daenerys.jpg',
      };

      mockThronesApiService.getCharacterById.mockResolvedValue(mockCharacter);

      const result = await thronesApiService.getCharacterById(0);

      expect(result).toEqual(mockCharacter);
      expect(mockThronesApiService.getCharacterById).toHaveBeenCalledWith(0);
    });

    it('should throw AppError when character not found', async () => {
      const mockError = new AppError('Character not found', 404);
      mockThronesApiService.getCharacterById.mockRejectedValue(mockError);

      await expect(thronesApiService.getCharacterById(999)).rejects.toThrow(
        'Character not found'
      );
    });
  });

  describe('searchCharacters', () => {
    it('should return all characters when query is empty', async () => {
      const mockCharacters: ThronesCharacter[] = [
        {
          id: 0,
          firstName: 'Daenerys',
          lastName: 'Targaryen',
          fullName: 'Daenerys Targaryen',
          title: 'Mother of Dragons',
          family: 'House Targaryen',
          image: 'daenerys.jpg',
          imageUrl: 'https://thronesapi.com/assets/images/daenerys.jpg',
        },
      ];

      mockThronesApiService.searchCharacters.mockResolvedValue(mockCharacters);

      const result = await thronesApiService.searchCharacters('');

      expect(result).toEqual(mockCharacters);
      expect(mockThronesApiService.searchCharacters).toHaveBeenCalledWith('');
    });

    it('should filter characters by name', async () => {
      const mockCharacters: ThronesCharacter[] = [
        {
          id: 0,
          firstName: 'Daenerys',
          lastName: 'Targaryen',
          fullName: 'Daenerys Targaryen',
          title: 'Mother of Dragons',
          family: 'House Targaryen',
          image: 'daenerys.jpg',
          imageUrl: 'https://thronesapi.com/assets/images/daenerys.jpg',
        },
      ];

      mockThronesApiService.searchCharacters.mockResolvedValue(mockCharacters);

      const result = await thronesApiService.searchCharacters('Daenerys');

      expect(result).toEqual(mockCharacters);
      expect(mockThronesApiService.searchCharacters).toHaveBeenCalledWith(
        'Daenerys'
      );
    });

    it('should throw AppError when search fails', async () => {
      const mockError = new AppError('Search failed', 502);
      mockThronesApiService.searchCharacters.mockRejectedValue(mockError);

      await expect(thronesApiService.searchCharacters('Jon')).rejects.toThrow(
        'Search failed'
      );
    });
  });
});
