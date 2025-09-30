import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Search, X } from 'lucide-react';
import { useCharacterStore } from '@/store/characterStore';
import { cn } from '@/utils/cn';
import { useEffect } from 'react';

const searchSchema = z.object({
  query: z.string().max(100, 'Search query is too long'),
});

type SearchFormData = z.infer<typeof searchSchema>;

interface SearchFormProps {
  onSearch?: (query: string) => void;
  className?: string;
}

export const SearchForm: React.FC<SearchFormProps> = ({ onSearch, className }) => {
  const { searchQuery, setSearchQuery, clearSearch } = useCharacterStore();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors }
  } = useForm<SearchFormData>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      query: searchQuery,
    },
  });

  const watchedQuery = watch('query');

  // Real-time search with debouncing
  useEffect(() => {
    const timer = setTimeout(() => {
      if (watchedQuery !== undefined) {
        const query = watchedQuery.trim();
        setSearchQuery(query);
        onSearch?.(query);
      }
    }, 300); // 300ms debounce

    return () => clearTimeout(timer);
  }, [watchedQuery, setSearchQuery, onSearch]);

  const onSubmit = (data: SearchFormData) => {
    const query = data.query.trim();
    setSearchQuery(query);
    onSearch?.(query);
  };

  const handleClear = () => {
    reset();
    clearSearch();
    onSearch?.('');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cn('w-full max-w-lg', className)}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>

        <input
          {...register('query')}
          type="text"
          placeholder="Search characters by name..."
          className={cn(
            'block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-lg',
            errors.query && 'border-red-500 focus:ring-red-500 focus:border-red-500'
          )}
        />

        {watchedQuery && watchedQuery.trim() && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {errors.query && (
        <p className="mt-2 text-sm text-red-600">{errors.query.message}</p>
      )}
    </form>
  );
};
