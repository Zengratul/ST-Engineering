import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CharacterCard } from '@/components/CharacterCard';
import { Character } from '@/types';

const mockCharacter: Character = {
  id: 0,
  name: 'Daenerys Targaryen',
  title: 'Mother of Dragons',
  family: 'House Targaryen',
  image: 'https://thronesapi.com/assets/images/daenerys.jpg',
};

describe('CharacterCard', () => {
  it('should render character information correctly', () => {
    render(<CharacterCard character={mockCharacter} />);

    expect(screen.getByText('Daenerys Targaryen')).toBeInTheDocument();
    expect(screen.getByText('Mother of Dragons')).toBeInTheDocument();
    expect(screen.getByText('House Targaryen')).toBeInTheDocument();
  });

  it('should render character image', () => {
    render(<CharacterCard character={mockCharacter} />);

    const image = screen.getByAltText('Daenerys Targaryen');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://thronesapi.com/assets/images/daenerys.jpg');
  });

  it('should handle missing image gracefully', () => {
    const characterWithoutImage: Character = {
      ...mockCharacter,
      image: '',
    };

    render(<CharacterCard character={characterWithoutImage} />);

    expect(screen.getByText('No Image')).toBeInTheDocument();
  });

  it('should handle image load error', () => {
    render(<CharacterCard character={mockCharacter} />);

    const image = screen.getByAltText('Daenerys Targaryen');
    fireEvent.error(image);

    expect(image).toHaveAttribute('src', 'https://via.placeholder.com/300x400?text=No+Image');
  });

  it('should call onClick when clicked', () => {
    const mockOnClick = vi.fn();
    render(<CharacterCard character={mockCharacter} onClick={mockOnClick} />);

    fireEvent.click(screen.getByText('Daenerys Targaryen'));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('should not call onClick when not provided', () => {
    render(<CharacterCard character={mockCharacter} />);

    // Should not throw error when clicked without onClick handler
    expect(() => {
      fireEvent.click(screen.getByText('Daenerys Targaryen'));
    }).not.toThrow();
  });

  it('should handle missing title', () => {
    const characterWithoutTitle: Character = {
      ...mockCharacter,
      title: '',
    };

    render(<CharacterCard character={characterWithoutTitle} />);

    expect(screen.getByText('Daenerys Targaryen')).toBeInTheDocument();
    expect(screen.queryByText('Mother of Dragons')).not.toBeInTheDocument();
  });

  it('should handle missing family', () => {
    const characterWithoutFamily: Character = {
      ...mockCharacter,
      family: '',
    };

    render(<CharacterCard character={characterWithoutFamily} />);

    expect(screen.getByText('Daenerys Targaryen')).toBeInTheDocument();
    expect(screen.queryByText('House:')).not.toBeInTheDocument();
  });

  it('should apply custom className', () => {
    render(<CharacterCard character={mockCharacter} className="custom-class" />);

    const card = screen.getByText('Daenerys Targaryen').closest('div')?.parentElement;
    expect(card).toHaveClass('custom-class');
  });

  it('should be clickable with cursor pointer', () => {
    render(<CharacterCard character={mockCharacter} />);

    const card = screen.getByText('Daenerys Targaryen').closest('div')?.parentElement;
    expect(card).toHaveClass('cursor-pointer');
  });
});
