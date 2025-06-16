
import { ProductCard } from "@/components/ProductCard";
import { NumberedPagination } from "@/components/NumberedPagination";
import { ProductSkeleton } from "@/components/ui/skeleton";

interface SearchResultsProps {
  displayProducts: any[];
  displayMode: 'grid' | 'list';
  totalCount: number;
  currentPage: number;
  totalPages: number;
  startIndex: number;
  endIndex: number;
  brandFilter: string[];
  storeFilter: string[];
  priceRange: { min: number; max: number };
  query: string;
  isLoading: boolean;
  isLoadingMore: boolean;
  isMobile: boolean;
  hasMore: boolean;
  onPageChange: (page: number) => void;
}

export const SearchResults = ({
  displayProducts,
  displayMode,
  totalCount,
  currentPage,
  totalPages,
  startIndex,
  endIndex,
  brandFilter,
  storeFilter,
  priceRange,
  query,
  isLoading,
  isLoadingMore,
  isMobile,
  hasMore,
  onPageChange
}: SearchResultsProps) => {
  const showSkeleton = isLoading && (currentPage === 1 || displayProducts.length === 0);

  if (showSkeleton) {
    return (
      <div className="space-y-6">
        <div className="mb-4">
          <div className="h-4 w-48 bg-gray-200 rounded animate-pulse"></div>
        </div>
        
        <div className={`
          ${displayMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6' 
            : 'flex flex-col gap-6'
          }
        `}>
          {Array.from({ length: isMobile ? 8 : 12 }).map((_, i) => (
            <ProductSkeleton key={i} displayMode={displayMode} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          {totalCount > 0 ? (
            <>
              {totalCount} produtos encontrados
              {!isMobile && totalCount > 0 && ` • Mostrando ${startIndex}-${endIndex}`}
              {brandFilter.length > 0 && ` • Marcas: ${brandFilter.join(', ')}`}
              {storeFilter.length > 0 && ` • Lojas: ${storeFilter.join(', ')}`}
              {(priceRange.min > 0 || priceRange.max < 1000) && 
                ` • Preço: R$ ${priceRange.min} - R$ ${priceRange.max}`
              }
            </>
          ) : (
            "Nenhum produto encontrado"
          )}
        </p>
      </div>

      <div className={`
        ${displayMode === 'grid' 
          ? 'grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6' 
          : 'flex flex-col gap-6'
        }
      `}>
        {displayProducts.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            displayMode={displayMode}
          />
        ))}
      </div>
      
      {displayProducts.length === 0 && totalCount === 0 && !isLoading && (
        <div className="text-center py-12">
          <p className="text-gray-500">Nenhum produto encontrado para "{query}"</p>
        </div>
      )}

      {/* Mobile infinite scroll loading indicator */}
      {isMobile && isLoadingMore && (
        <div className="text-center py-4">
          <div className="flex justify-center items-center space-x-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
            <p className="text-gray-500">Carregando mais produtos...</p>
          </div>
        </div>
      )}

      {/* Desktop Numbered Pagination */}
      {!isMobile && totalPages > 1 && totalCount > 0 && (
        <div className="flex justify-center mt-8">
          <NumberedPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </>
  );
};
