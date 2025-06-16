
import { SearchBar } from "@/components/SearchBar";
import { ProductCard } from "@/components/ProductCard";
import { SearchControls } from "@/components/SearchControls";
import { FilterSidebar } from "@/components/FilterSidebar";
import { useSearchParams, Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useProducts, ProductView } from "@/hooks/useProducts";

const PRODUCTS_PER_PAGE = 50;

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState<string>('nome-asc');
  const [displayMode, setDisplayMode] = useState<'grid' | 'list'>('grid');
  const [visibleProducts, setVisibleProducts] = useState(PRODUCTS_PER_PAGE);
  const [brandFilter, setBrandFilter] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({ min: 0, max: 1000 });
  
  const query = searchParams.get("q") || "";
  const { data, isLoading } = useProducts(query, sortBy, brandFilter, priceRange);
  
  const products = data?.products || [];
  const availableBrands = data?.availableBrands || [];

  // Sort products based on selected sorting option
  const sortedProducts = [...products].sort((a, b) => {
    const productA = a as ProductView;
    const productB = b as ProductView;
    
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

  const productsToShow = sortedProducts.slice(0, visibleProducts);
  const hasMoreProducts = visibleProducts < sortedProducts.length;

  return (
    <div className="min-h-screen">
      <header className="border-b">
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
      
      <div className="container mx-auto px-4 py-4 border-b">
        <SearchControls 
          onSortChange={setSortBy}
          onDisplayModeChange={setDisplayMode}
          displayMode={displayMode}
        />
      </div>

      <main className="container mx-auto px-4 py-8">
        <div className="flex gap-6">
          {/* Filter Sidebar */}
          <FilterSidebar
            onBrandChange={setBrandFilter}
            onPriceRangeChange={setPriceRange}
            onClearFilters={handleClearFilters}
            availableBrands={availableBrands}
          />

          {/* Products Section */}
          <div className="flex-1">
            {isLoading ? (
              <div className="text-center py-12">
                <p className="text-gray-500">Loading products...</p>
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
                    ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6' 
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

                {hasMoreProducts && (
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
