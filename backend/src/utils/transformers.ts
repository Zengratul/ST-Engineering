import { ThronesCharacter, Character } from '@/types';

/**
 * Transform ThronesAPI character data to frontend-friendly format
 */
export const transformCharacter = (
  thronesCharacter: ThronesCharacter
): Character => {
  return {
    id: thronesCharacter.id,
    name:
      thronesCharacter.fullName ||
      `${thronesCharacter.firstName} ${thronesCharacter.lastName}`.trim(),
    title: thronesCharacter.title || 'Unknown',
    family: thronesCharacter.family || 'Unknown',
    image: thronesCharacter.imageUrl || thronesCharacter.image || '',
  };
};

/**
 * Transform array of ThronesAPI characters
 */
export const transformCharacters = (
  thronesCharacters: ThronesCharacter[]
): Character[] => {
  return thronesCharacters.map(transformCharacter);
};
