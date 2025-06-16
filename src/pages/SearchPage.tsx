
import { SearchBar } from "@/components/SearchBar";
import { ProductCard } from "@/components/ProductCard";
import { SearchControls } from "@/components/SearchControls";
import { FilterSidebar } from "@/components/FilterSidebar";
import { MobileFilters } from "@/components/MobileFilters";
import { 
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useSearchParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useProducts } from "@/hooks/useProducts";
import { useIsMobile } from "@/hooks/use-mobile";

const PRODUCTS_PER_PAGE = 50;

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState<string>('nome-asc');
  const [displayMode, setDisplayMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [brandFilter, setBrandFilter] = useState<string[]>([]);
  const [storeFilter, setStoreFilter] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({ min: 0, max: 1000 });
  
  const query = searchParams.get("q") || "";
  const { data, isLoading } = useProducts(
    query, 
    sortBy, 
    currentPage, 
    PRODUCTS_PER_PAGE, 
    brandFilter, 
    priceRange, 
    storeFilter
  );
  const isMobile = useIsMobile();
  
  const products = data?.products || [];
  const totalCount = data?.totalCount || 0;
  const hasMore = data?.hasMore || false;
  const availableBrands = data?.availableBrands || [];
  const availableStores = data?.availableStores || [];

  // Calculate pagination info
  const totalPages = Math.ceil(totalCount / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE + 1;
  const endIndex = Math.min(currentPage * PRODUCTS_PER_PAGE, totalCount);

  // Calculate active filters count for mobile
  const activeFiltersCount = brandFilter.length + storeFilter.length +
    (priceRange.min > 0 || priceRange.max < 1000 ? 1 : 0);

  // Reset filters and pagination when search query changes
  useEffect(() => {
    setBrandFilter([]);
    setStoreFilter([]);
    setPriceRange({ min: 0, max: 1000 });
    setCurrentPage(1);
  }, [query]);

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [brandFilter, storeFilter, priceRange, sortBy]);

  const handleClearFilters = () => {
    setBrandFilter([]);
    setStoreFilter([]);
    setPriceRange({ min: 0, max: 1000 });
    setCurrentPage(1);
  };

  const handleBrandFilterChange = (brands: string[]) => {
    setBrandFilter(brands);
  };

  const handleStoreFilterChange = (stores: string[]) => {
    setStoreFilter(stores);
  };

  const handlePriceRangeChange = (range: { min: number; max: number }) => {
    setPriceRange(range);
  };

  // Generate pagination items
  const generatePaginationItems = () => {
    const items = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              onClick={() => setCurrentPage(i)}
              isActive={currentPage === i}
              className="cursor-pointer"
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else {
      // Show pages with ellipsis
      items.push(
        <PaginationItem key={1}>
          <PaginationLink
            onClick={() => setCurrentPage(1)}
            isActive={currentPage === 1}
            className="cursor-pointer"
          >
            1
          </PaginationLink>
        </PaginationItem>
      );

      if (currentPage > 3) {
        items.push(
          <PaginationItem key="ellipsis1">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        if (i !== 1 && i !== totalPages) {
          items.push(
            <PaginationItem key={i}>
              <PaginationLink
                onClick={() => setCurrentPage(i)}
                isActive={currentPage === i}
                className="cursor-pointer"
              >
                {i}
              </PaginationLink>
            </PaginationItem>
          );
        }
      }

      if (currentPage < totalPages - 2) {
        items.push(
          <PaginationItem key="ellipsis2">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      if (totalPages > 1) {
        items.push(
          <PaginationItem key={totalPages}>
            <PaginationLink
              onClick={() => setCurrentPage(totalPages)}
              isActive={currentPage === totalPages}
              className="cursor-pointer"
            >
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        );
      }
    }

    return items;
  };

  return (
    <div className="min-h-screen">
      {/* Fixed Header */}
      <header className={`border-b bg-white z-50 ${isMobile ? 'fixed top-0 left-0 right-0' : ''}`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-8">
            <Link to="/">
              <img 
                src="/lovable-uploads/5a8f2c7c-9460-4fbf-a4ab-7160fe6749d2.png" 
                alt="Bestpromo Logo" 
                className="h-8"
              />
            </Link>
            <SearchBar initialValue={query} className="flex-1" />
          </div>
        </div>
      </header>
      
      {/* Mobile Filters - Fixed below header */}
      {isMobile && (
        <div className="fixed top-[72px] left-0 right-0 z-40">
          <MobileFilters
            onBrandChange={handleBrandFilterChange}
            onStoreChange={handleStoreFilterChange}
            onPriceRangeChange={handlePriceRangeChange}
            onClearFilters={handleClearFilters}
            onSortChange={setSortBy}
            onDisplayModeChange={setDisplayMode}
            displayMode={displayMode}
            availableBrands={availableBrands}
            availableStores={availableStores}
            searchQuery={query}
            allProducts={products}
            activeFiltersCount={activeFiltersCount}
            selectedBrands={brandFilter}
            selectedStores={storeFilter}
            priceRange={priceRange}
          />
        </div>
      )}

      {/* Desktop Controls - Only show on larger screens */}
      {!isMobile && (
        <div className="container mx-auto px-4 py-4 border-b">
          <SearchControls 
            onSortChange={setSortBy}
            onDisplayModeChange={setDisplayMode}
            displayMode={displayMode}
          />
        </div>
      )}

      {/* Main Content with appropriate padding */}
      <main className={`container mx-auto px-4 py-8 ${isMobile ? 'pt-[140px]' : ''}`}>
        <div className="flex gap-6">
          {/* Desktop Filter Sidebar - Only show on larger screens */}
          {!isMobile && (
            <FilterSidebar
              onBrandChange={handleBrandFilterChange}
              onStoreChange={handleStoreFilterChange}
              onPriceRangeChange={handlePriceRangeChange}
              onClearFilters={handleClearFilters}
              availableBrands={availableBrands}
              availableStores={availableStores}
              searchQuery={query}
              allProducts={products}
              selectedBrands={brandFilter}
              selectedStores={storeFilter}
              priceRange={priceRange}
            />
          )}

          {/* Products Section */}
          <div className="flex-1">
            {isLoading ? (
              <div className="text-center py-12">
                <p className="text-gray-500">Carregando produtos...</p>
              </div>
            ) : (
              <>
                <div className="mb-4">
                  <p className="text-sm text-gray-600">
                    {totalCount} produtos encontrados
                    {totalCount > 0 && ` • Mostrando ${startIndex}-${endIndex}`}
                    {brandFilter.length > 0 && ` • Marcas: ${brandFilter.join(', ')}`}
                    {storeFilter.length > 0 && ` • Lojas: ${storeFilter.join(', ')}`}
                    {(priceRange.min > 0 || priceRange.max < 1000) && 
                      ` • Preço: R$ ${priceRange.min} - R$ ${priceRange.max}`
                    }
                  </p>
                </div>

                <div className={`
                  ${displayMode === 'grid' 
                    ? 'grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6' 
                    : 'flex flex-col gap-6'
                  }
                `}>
                  {products.map((product) => (
                    <ProductCard 
                      key={product.id} 
                      product={product} 
                      displayMode={displayMode}
                    />
                  ))}
                </div>
                
                {products.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-gray-500">Nenhum produto encontrado para "{query}"</p>
                  </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center mt-8">
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious 
                            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                            className={`cursor-pointer ${currentPage === 1 ? 'pointer-events-none opacity-50' : ''}`}
                          />
                        </PaginationItem>
                        
                        {generatePaginationItems()}
                        
                        <PaginationItem>
                          <PaginationNext 
                            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                            className={`cursor-pointer ${currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}`}
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default SearchPage;
