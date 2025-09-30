import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchForm } from '@/components/SearchForm';

// Mock the store
vi.mock('@/store/characterStore', () => ({
  useCharacterStore: vi.fn(() => ({
    searchQuery: '',
    setSearchQuery: vi.fn(),
    clearSearch: vi.fn(),
  })),
}));

describe('SearchForm', () => {
  const mockOnSearch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render search input', () => {
    render(<SearchForm onSearch={mockOnSearch} />);

    expect(screen.getByPlaceholderText('Search characters by name...')).toBeInTheDocument();
  });

  it('should render search icon', () => {
    render(<SearchForm onSearch={mockOnSearch} />);

    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('should call onSearch when form is submitted', async () => {
    const user = userEvent.setup();
    render(<SearchForm onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText('Search characters by name...');
    await user.type(input, 'Jon Snow');
    await user.keyboard('{Enter}');

    await waitFor(() => {
      expect(mockOnSearch).toHaveBeenCalledWith('Jon Snow');
    });
  });

  it('should show clear button when input has value', async () => {
    const user = userEvent.setup();
    render(<SearchForm onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText('Search characters by name...');
    await user.type(input, 'Jon');

    // The clear button (X icon) should be visible
    const clearButton = screen.getByRole('button', { hidden: true });
    expect(clearButton).toBeInTheDocument();
  });

  it('should clear input when clear button is clicked', async () => {
    const user = userEvent.setup();
    render(<SearchForm onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText('Search characters by name...');
    await user.type(input, 'Jon');

    const clearButton = screen.getByRole('button', { hidden: true });
    await user.click(clearButton);

    expect(input).toHaveValue('');
  });

  it('should not show clear button when input is empty', () => {
    render(<SearchForm onSearch={mockOnSearch} />);

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('should not show clear button when input only has whitespace', async () => {
    const user = userEvent.setup();
    render(<SearchForm onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText('Search characters by name...');
    await user.type(input, '   ');

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('should apply custom className', () => {
    render(<SearchForm onSearch={mockOnSearch} className="custom-class" />);

    const form = screen.getByRole('textbox').closest('form');
    expect(form).toHaveClass('custom-class');
  });

  it('should have proper input attributes', () => {
    render(<SearchForm onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText('Search characters by name...');
    expect(input).toHaveAttribute('type', 'text');
  });

  it('should handle real-time search with debouncing', async () => {
    const user = userEvent.setup();
    render(<SearchForm onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText('Search characters by name...');
    await user.type(input, 'Jon');

    // Wait for debounce
    await waitFor(() => {
      expect(mockOnSearch).toHaveBeenCalledWith('Jon');
    }, { timeout: 1000 });
  });

  it('should not call onSearch immediately on every keystroke', async () => {
    const user = userEvent.setup();
    render(<SearchForm onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText('Search characters by name...');
    await user.type(input, 'J');

    // Should not be called immediately
    expect(mockOnSearch).not.toHaveBeenCalled();

    // Wait for debounce
    await waitFor(() => {
      expect(mockOnSearch).toHaveBeenCalledWith('J');
    }, { timeout: 1000 });
  });
});
