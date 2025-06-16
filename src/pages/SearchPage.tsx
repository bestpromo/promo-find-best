
import { SearchBar } from "@/components/SearchBar";
import { ProductCard } from "@/components/ProductCard";
import { SearchControls } from "@/components/SearchControls";
import { FilterSidebar } from "@/components/FilterSidebar";
import { MobileFilters } from "@/components/MobileFilters";
import { useSearchParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useProducts, ProductView, applyFilters } from "@/hooks/useProducts";
import { useIsMobile } from "@/hooks/use-mobile";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";

const PRODUCTS_PER_PAGE = 50;

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState<string>('nome-asc');
  const [displayMode, setDisplayMode] = useState<'grid' | 'list'>('grid');
  const [visibleProducts, setVisibleProducts] = useState(PRODUCTS_PER_PAGE);
  const [brandFilter, setBrandFilter] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({ min: 0, max: 1000 });
  
  const query = searchParams.get("q") || "";
  const { data, isLoading } = useProducts(query, sortBy);
  const isMobile = useIsMobile();
  
  const allProducts = data?.allProducts || [];
  const availableBrands = data?.availableBrands || [];

  // Apply filters client-side
  const filteredProducts = applyFilters(allProducts, brandFilter, priceRange);

  // Calculate active filters count for mobile
  const activeFiltersCount = brandFilter.length + 
    (priceRange.min > 0 || priceRange.max < 1000 ? 1 : 0);

  // Reset filters when search query changes
  useEffect(() => {
    console.log('Search query changed to:', query);
    console.log('Clearing all filters in SearchPage');
    setBrandFilter([]);
    setPriceRange({ min: 0, max: 1000 });
    setVisibleProducts(PRODUCTS_PER_PAGE);
  }, [query]);

  // Helper function to check if product has image
  const hasValidImage = (product: ProductView) => {
    const isSupabaseProduct = 'offer_id' in product;
    const imageUrl = isSupabaseProduct ? product.image_url : (product as any).image;
    
    // Consider image invalid if it's empty, null, undefined, or placeholder
    return imageUrl && 
           imageUrl !== '/placeholder.svg' && 
           imageUrl.trim() !== '' &&
           imageUrl !== 'placeholder.svg';
  };

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const productA = a as ProductView;
    const productB = b as ProductView;
    
    // First, sort by image availability (products with images first)
    const aHasImage = hasValidImage(productA);
    const bHasImage = hasValidImage(productB);
    
    if (aHasImage && !bHasImage) return -1; // A has image, B doesn't - A comes first
    if (!aHasImage && bHasImage) return 1;  // B has image, A doesn't - B comes first
    
    // If both have images or both don't have images, sort by the selected criterion
    switch (sortBy) {
      case 'price-desc':
        return (productB.sale_price || 0) - (productA.sale_price || 0);
      case 'price-asc':
        return (productA.sale_price || 0) - (productB.sale_price || 0);
      case 'nome-desc':
        return (productB.title || '').localeCompare(productA.title || '');
      case 'nome-asc':
      default:
        return (productA.title || '').localeCompare(productB.title || '');
    }
  });

  const handleLoadMore = () => {
    setVisibleProducts(prev => prev + PRODUCTS_PER_PAGE);
  };

  const handleClearFilters = () => {
    setBrandFilter([]);
    setPriceRange({ min: 0, max: 1000 });
    setVisibleProducts(PRODUCTS_PER_PAGE);
  };

  const handleBrandFilterChange = (brands: string[]) => {
    setBrandFilter(brands);
    setVisibleProducts(PRODUCTS_PER_PAGE); // Reset pagination when filter changes
  };

  const handlePriceRangeChange = (range: { min: number; max: number }) => {
    setPriceRange(range);
    setVisibleProducts(PRODUCTS_PER_PAGE); // Reset pagination when filter changes
  };

  const productsToShow = sortedProducts.slice(0, visibleProducts);
  const hasMoreProducts = visibleProducts < sortedProducts.length;

  // Use infinite scroll hook for mobile
  const { isLoading: isLoadingMore } = useInfiniteScroll({
    hasMore: hasMoreProducts,
    onLoadMore: handleLoadMore,
    threshold: 200
  });

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
            onPriceRangeChange={handlePriceRangeChange}
            onClearFilters={handleClearFilters}
            onSortChange={setSortBy}
            onDisplayModeChange={setDisplayMode}
            displayMode={displayMode}
            availableBrands={availableBrands}
            searchQuery={query}
            allProducts={allProducts}
            activeFiltersCount={activeFiltersCount}
            selectedBrands={brandFilter}
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
              onPriceRangeChange={handlePriceRangeChange}
              onClearFilters={handleClearFilters}
              availableBrands={availableBrands}
              searchQuery={query}
              allProducts={allProducts}
              selectedBrands={brandFilter}
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
                    {sortedProducts.length} produtos encontrados
                    {brandFilter.length > 0 && ` • Marcas: ${brandFilter.join(', ')}`}
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
                  {productsToShow.map((product) => (
                    <ProductCard 
                      key={product.id} 
                      product={product} 
                      displayMode={displayMode}
                    />
                  ))}
                </div>
                
                {sortedProducts.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-gray-500">Nenhum produto encontrado para "{query}"</p>
                  </div>
                )}

                {/* Show loading indicator on mobile during infinite scroll */}
                {isMobile && isLoadingMore && (
                  <div className="text-center py-4">
                    <p className="text-gray-500">Carregando mais produtos...</p>
                  </div>
                )}

                {/* Show load more button only on desktop/tablet */}
                {!isMobile && hasMoreProducts && (
                  <div className="flex justify-center mt-8">
                    <Button 
                      onClick={handleLoadMore}
                      variant="outline"
                      className="hover:bg-orange-500 hover:text-white"
                    >
                      Carregar Mais Produtos ({Math.min(PRODUCTS_PER_PAGE, sortedProducts.length - visibleProducts)} restantes)
                    </Button>
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
