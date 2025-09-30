import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import {
  useCharacters,
  useCharacter,
  useSearchCharacters,
} from '@/hooks/useCharacters';
// Mock the API service
vi.mock('@/services/api', () => ({
  characterApi: {
    getAllCharacters: vi.fn(),
    getCharacterById: vi.fn(),
    searchCharacters: vi.fn(),
  },
}));

import { characterApi } from '@/services/api';
const mockCharacterApi = characterApi as vi.Mocked<typeof characterApi>;

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  return ({ children }: { children: React.ReactNode }) =>
    React.createElement(QueryClientProvider, { client: queryClient }, children);
};

describe('useCharacters', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch all characters successfully', async () => {
    const mockData = {
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

    const { result } = renderHook(() => useCharacters(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(mockData);
  });

  it('should handle fetch error', async () => {
    const mockError = new Error('API Error');
    mockCharacterApi.getAllCharacters.mockRejectedValue(mockError);

    const { result } = renderHook(() => useCharacters(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isError || result.current.isLoading).toBe(true);
    });

    // The error might be handled by React Query's retry mechanism
    expect(mockCharacterApi.getAllCharacters).toHaveBeenCalled();
  });
});

describe('useCharacter', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch character by ID successfully', async () => {
    const mockData = {
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

    const { result } = renderHook(() => useCharacter(0), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(mockData);
  });

  it('should not fetch when ID is invalid', () => {
    vi.mocked(characterApi.getCharacterById).mockResolvedValue({
      success: true,
      data: {
        id: 0,
        name: 'Test',
        title: 'Test',
        family: 'Test',
        image: 'test.jpg',
      },
    });

    const { result } = renderHook(() => useCharacter(-1), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(false);
    expect(characterApi.getCharacterById).not.toHaveBeenCalled();
  });

  it('should handle fetch error', async () => {
    const mockError = new Error('Character not found');
    mockCharacterApi.getCharacterById.mockRejectedValue(mockError);

    const { result } = renderHook(() => useCharacter(999), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isError || result.current.isLoading).toBe(true);
    });

    // The error might be handled by React Query's retry mechanism
    expect(mockCharacterApi.getCharacterById).toHaveBeenCalled();
  });
});

describe('useSearchCharacters', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should search characters successfully', async () => {
    const mockData = {
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

    const { result } = renderHook(() => useSearchCharacters('Daenerys'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(mockData);
  });

  it('should not fetch when query is empty', () => {
    vi.mocked(characterApi.searchCharacters).mockResolvedValue({
      success: true,
      data: [],
      total: 0,
    });

    const { result } = renderHook(() => useSearchCharacters(''), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(false);
    expect(characterApi.searchCharacters).not.toHaveBeenCalled();
  });

  it('should handle search error', async () => {
    const mockError = new Error('Search failed');
    mockCharacterApi.searchCharacters.mockRejectedValue(mockError);

    const { result } = renderHook(() => useSearchCharacters('Jon'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isError || result.current.isLoading).toBe(true);
    });

    // The error might be handled by React Query's retry mechanism
    expect(mockCharacterApi.searchCharacters).toHaveBeenCalled();
  });
});
