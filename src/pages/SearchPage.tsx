import { useEffect } from "react";
import { useProducts } from "@/hooks/useProducts";
import { useIsMobile } from "@/hooks/use-mobile";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { useSearchState } from "@/hooks/useSearchState";
import { SearchPageHeader } from "@/components/search/SearchPageHeader";
import { SearchPageLayout } from "@/components/search/SearchPageLayout";
import { SearchResults } from "@/components/search/SearchResults";

// Reduced from 48 to 24 to avoid server overload
const PRODUCTS_PER_PAGE = 24;

const SearchPage = () => {
  const {
    sortBy,
    setSortBy,
    displayMode,
    setDisplayMode,
    currentPage,
    setCurrentPage,
    brandFilter,
    setBrandFilter,
    storeFilter,
    setStoreFilter,
    priceRange,
    setPriceRange,
    allProducts,
    setAllProducts,
    isLoadingMore,
    setIsLoadingMore,
    query
  } = useSearchState();

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
  const totalPages = Math.max(1, Math.ceil(totalCount / PRODUCTS_PER_PAGE));
  const startIndex = totalCount > 0 ? (currentPage - 1) * PRODUCTS_PER_PAGE + 1 : 0;
  const endIndex = Math.min(currentPage * PRODUCTS_PER_PAGE, totalCount);

  // Calculate active filters count for mobile
  const activeFiltersCount = brandFilter.length + storeFilter.length +
    (priceRange.min > 0 || priceRange.max < 1000 ? 1 : 0);

  // Update products for mobile infinite scroll
  useEffect(() => {
    if (isMobile) {
      if (currentPage === 1) {
        setAllProducts(products);
      } else if (!isLoading) {
        setAllProducts(prev => [...prev, ...products]);
        setIsLoadingMore(false);
      }
    }
  }, [products, isMobile, currentPage, isLoading]);

  // Load more function for infinite scroll
  const loadMore = () => {
    if (!isLoadingMore && hasMore) {
      setIsLoadingMore(true);
      setCurrentPage(prev => prev + 1);
    }
  };

  // Use infinite scroll hook for mobile
  useInfiniteScroll({
    hasMore: hasMore && isMobile,
    onLoadMore: loadMore,
    threshold: 200
  });

  const handleClearFilters = () => {
    setBrandFilter([]);
    setStoreFilter([]);
    setPriceRange({ min: 0, max: 1000 });
    setCurrentPage(1);
    setAllProducts([]);
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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Determine which products to display
  const displayProducts = isMobile ? allProducts : products;

  console.log('SearchPage render:', { 
    totalCount, 
    totalPages, 
    currentPage, 
    isMobile,
    displayProductsLength: displayProducts.length,
    shouldShowPagination: !isMobile && totalPages > 1,
    isLoading
  });

  return (
    <div className="min-h-screen">
      <SearchPageHeader query={query} isMobile={isMobile} />
      
      <SearchPageLayout
        isMobile={isMobile}
        query={query}
        displayMode={displayMode}
        availableBrands={availableBrands}
        availableStores={availableStores}
        displayProducts={displayProducts}
        activeFiltersCount={activeFiltersCount}
        selectedBrands={brandFilter}
        selectedStores={storeFilter}
        priceRange={priceRange}
        isLoading={isLoading}
        onSortChange={setSortBy}
        onDisplayModeChange={setDisplayMode}
        onBrandFilterChange={handleBrandFilterChange}
        onStoreFilterChange={handleStoreFilterChange}
        onPriceRangeChange={handlePriceRangeChange}
        onClearFilters={handleClearFilters}
      >
        <SearchResults
          displayProducts={displayProducts}
          displayMode={displayMode}
          totalCount={totalCount}
          currentPage={currentPage}
          totalPages={totalPages}
          startIndex={startIndex}
          endIndex={endIndex}
          brandFilter={brandFilter}
          storeFilter={storeFilter}
          priceRange={priceRange}
          query={query}
          isLoading={isLoading}
          isLoadingMore={isLoadingMore}
          isMobile={isMobile}
          hasMore={hasMore}
          onPageChange={handlePageChange}
        />
      </SearchPageLayout>
    </div>
  );
};

export default SearchPage;
