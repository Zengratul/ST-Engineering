import { Character } from '@/types';
import { cn } from '@/utils/cn';

interface CharacterCardProps {
  character: Character;
  onClick?: () => void;
  className?: string;
}

export const CharacterCard: React.FC<CharacterCardProps> = ({
  character,
  onClick,
  className
}) => {
  return (
    <div
      className={cn(
        'bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105',
        className
      )}
      onClick={onClick}
    >
      <div className="w-full h-48 bg-gray-200 overflow-hidden">
        {character.image ? (
          <img
            src={character.image}
            alt={character.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://via.placeholder.com/300x400?text=No+Image';
            }}
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500 text-sm">No Image</span>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-bold text-lg text-gray-900 mb-1 line-clamp-2">
          {character.name}
        </h3>

        {character.title && (
          <p className="text-sm text-blue-600 mb-2 font-medium">
            {character.title}
          </p>
        )}

        {character.family && (
          <p className="text-xs text-gray-600">
            House: <span className="font-medium">{character.family}</span>
          </p>
        )}
      </div>
    </div>
  );
};
