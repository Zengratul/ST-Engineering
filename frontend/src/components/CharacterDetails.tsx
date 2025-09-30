import { Character } from '@/types';
import { ArrowLeft, Crown, Shield } from 'lucide-react';
import { cn } from '@/utils/cn';

interface CharacterDetailsProps {
  character: Character;
  onBack?: () => void;
  className?: string;
}

export const CharacterDetails: React.FC<CharacterDetailsProps> = ({
  character,
  onBack,
  className
}) => {
  return (
    <div className={cn('max-w-4xl mx-auto p-6', className)}>
      {/* Back button */}
      {onBack && (
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Characters
        </button>
      )}

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          {/* Character Image */}
          <div className="md:w-1/3">
            <div className="w-full h-96 md:h-full bg-gray-200">
              {character.image ? (
                <img
                  src={character.image}
                  alt={character.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://via.placeholder.com/400x600?text=No+Image';
                  }}
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500 text-lg">No Image Available</span>
                </div>
              )}
            </div>
          </div>

          {/* Character Information */}
          <div className="md:w-2/3 p-8">
            <div className="space-y-6">
              {/* Name */}
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                  {character.name}
                </h1>
              </div>

              {/* Title */}
              {character.title && (
                <div className="flex items-center gap-3">
                  <Crown className="h-6 w-6 text-yellow-600" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-1">Title</h3>
                    <p className="text-xl text-blue-600 font-medium">{character.title}</p>
                  </div>
                </div>
              )}

              {/* Family */}
              {character.family && (
                <div className="flex items-center gap-3">
                  <Shield className="h-6 w-6 text-red-600" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-1">House</h3>
                    <p className="text-xl text-red-600 font-medium">{character.family}</p>
                  </div>
                </div>
              )}

              {/* Additional Info */}
              <div className="pt-6 border-t border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                      Character ID
                    </h4>
                    <p className="text-gray-900 font-mono">#{character.id}</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                      Status
                    </h4>
                    <p className="text-gray-900">Available</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
