import { describe, it, expect, beforeEach } from 'vitest';
import { useCharacterStore } from '@/store/characterStore';
import { act, renderHook } from '@testing-library/react';

describe('useCharacterStore', () => {
  beforeEach(() => {
    // Reset store state before each test
    useCharacterStore.setState({
      searchQuery: '',
    });
  });

  it('should have initial state', () => {
    const { result } = renderHook(() => useCharacterStore());

    expect(result.current.searchQuery).toBe('');
  });

  it('should set search query', () => {
    const { result } = renderHook(() => useCharacterStore());

    act(() => {
      result.current.setSearchQuery('Jon Snow');
    });

    expect(result.current.searchQuery).toBe('Jon Snow');
  });

  it('should clear search query', () => {
    const { result } = renderHook(() => useCharacterStore());

    // First set a search query
    act(() => {
      result.current.setSearchQuery('Daenerys');
    });

    expect(result.current.searchQuery).toBe('Daenerys');

    // Then clear it
    act(() => {
      result.current.clearSearch();
    });

    expect(result.current.searchQuery).toBe('');
  });

  it('should handle empty string in setSearchQuery', () => {
    const { result } = renderHook(() => useCharacterStore());

    act(() => {
      result.current.setSearchQuery('');
    });

    expect(result.current.searchQuery).toBe('');
  });

  it('should handle multiple state updates', () => {
    const { result } = renderHook(() => useCharacterStore());

    act(() => {
      result.current.setSearchQuery('Jon');
    });

    expect(result.current.searchQuery).toBe('Jon');

    act(() => {
      result.current.setSearchQuery('Daenerys');
    });

    expect(result.current.searchQuery).toBe('Daenerys');

    act(() => {
      result.current.clearSearch();
    });

    expect(result.current.searchQuery).toBe('');
  });
});
