import { transformCharacter, transformCharacters } from '@/utils/transformers';
import { ThronesCharacter } from '@/types';

describe('Transformers', () => {
  const mockThronesCharacter: ThronesCharacter = {
    id: 0,
    firstName: 'Daenerys',
    lastName: 'Targaryen',
    fullName: 'Daenerys Targaryen',
    title: 'Mother of Dragons',
    family: 'House Targaryen',
    image: 'daenerys.jpg',
    imageUrl: 'https://thronesapi.com/assets/images/daenerys.jpg',
  };

  describe('transformCharacter', () => {
    it('should transform a ThronesCharacter to Character format', () => {
      const result = transformCharacter(mockThronesCharacter);

      expect(result).toEqual({
        id: 0,
        name: 'Daenerys Targaryen',
        title: 'Mother of Dragons',
        family: 'House Targaryen',
        image: 'https://thronesapi.com/assets/images/daenerys.jpg',
      });
    });

    it('should handle missing fullName by combining firstName and lastName', () => {
      const characterWithoutFullName: ThronesCharacter = {
        ...mockThronesCharacter,
        fullName: '',
      };

      const result = transformCharacter(characterWithoutFullName);

      expect(result.name).toBe('Daenerys Targaryen');
    });

    it('should handle missing title', () => {
      const characterWithoutTitle: ThronesCharacter = {
        ...mockThronesCharacter,
        title: '',
      };

      const result = transformCharacter(characterWithoutTitle);

      expect(result.title).toBe('Unknown');
    });

    it('should handle missing family', () => {
      const characterWithoutFamily: ThronesCharacter = {
        ...mockThronesCharacter,
        family: '',
      };

      const result = transformCharacter(characterWithoutFamily);

      expect(result.family).toBe('Unknown');
    });

    it('should prefer imageUrl over image', () => {
      const characterWithBothImages: ThronesCharacter = {
        ...mockThronesCharacter,
        image: 'old-image.jpg',
        imageUrl: 'https://thronesapi.com/assets/images/new-image.jpg',
      };

      const result = transformCharacter(characterWithBothImages);

      expect(result.image).toBe(
        'https://thronesapi.com/assets/images/new-image.jpg'
      );
    });

    it('should fallback to image when imageUrl is missing', () => {
      const characterWithoutImageUrl: ThronesCharacter = {
        ...mockThronesCharacter,
        imageUrl: '',
      };

      const result = transformCharacter(characterWithoutImageUrl);

      expect(result.image).toBe('daenerys.jpg');
    });
  });

  describe('transformCharacters', () => {
    it('should transform an array of ThronesCharacters', () => {
      const characters = [
        mockThronesCharacter,
        {
          ...mockThronesCharacter,
          id: 1,
          firstName: 'Jon',
          lastName: 'Snow',
          fullName: 'Jon Snow',
          title: 'King of the North',
          family: 'House Stark',
        },
      ];

      const result = transformCharacters(characters);

      expect(result).toHaveLength(2);
      expect(result[0].name).toBe('Daenerys Targaryen');
      expect(result[1].name).toBe('Jon Snow');
    });

    it('should return empty array for empty input', () => {
      const result = transformCharacters([]);

      expect(result).toEqual([]);
    });
  });
});
