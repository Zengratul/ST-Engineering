import { Request, Response } from 'express';
import { thronesApiService } from '@/services/thronesApiService';
import { transformCharacters, transformCharacter } from '@/utils/transformers';
import { asyncHandler } from '@/utils/errors';
import { CharacterSearchParams } from '@/types';

/**
 * Get all characters
 */
export const getAllCharacters = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, family } = req.query as CharacterSearchParams;

    let characters;

    if (name) {
      characters = await thronesApiService.searchCharacters(name);
    } else {
      characters = await thronesApiService.getAllCharacters();
    }

    // Filter by family if provided
    if (family) {
      characters = characters.filter((char) =>
        char.family?.toLowerCase().includes(family.toLowerCase())
      );
    }

    const transformedCharacters = transformCharacters(characters);

    res.json({
      success: true,
      data: transformedCharacters,
      total: transformedCharacters.length,
    });
  }
);

/**
 * Get a single character by ID
 */
export const getCharacterById = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    // Validate ID
    const characterId = parseInt(id, 10);
    if (isNaN(characterId)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid character ID',
      });
    }

    const character = await thronesApiService.getCharacterById(characterId);
    const transformedCharacter = transformCharacter(character);

    res.json({
      success: true,
      data: transformedCharacter,
    });
  }
);

/**
 * Search characters by name
 */
export const searchCharacters = asyncHandler(
  async (req: Request, res: Response) => {
    const { q } = req.query;

    if (!q || typeof q !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Search query is required',
      });
    }

    const characters = await thronesApiService.searchCharacters(q);
    const transformedCharacters = transformCharacters(characters);

    res.json({
      success: true,
      data: transformedCharacters,
      total: transformedCharacters.length,
    });
  }
);
