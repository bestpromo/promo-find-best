
import { useQuery } from "@tanstack/react-query";
import type { ProductView, ProductsResponse, ProductFilters } from "@/types/product";
import { createDataQuery, createFiltersQuery } from "@/utils/productQueries";
import { transformProductData, extractUniqueFilters } from "@/utils/productTransformers";

export const useProducts = (
  searchQuery: string, 
  sortBy: string, 
  page: number = 1,
  pageSize: number = 50,
  brandFilter?: string[], 
  priceRange?: { min: number; max: number },
  storeFilter?: string[]
) => {
  return useQuery({
    queryKey: ["products", searchQuery, sortBy, page, pageSize, brandFilter, priceRange, storeFilter],
    queryFn: async (): Promise<ProductsResponse> => {
      try {
        console.log('Fetching products with params:', { searchQuery, sortBy, page, pageSize, brandFilter, priceRange, storeFilter });

        const filters: ProductFilters = {
          searchQuery,
          sortBy,
          page,
          pageSize,
          brandFilter,
          priceRange,
          storeFilter
        };

        // Create queries with shorter timeout approach
        const dataQuery = createDataQuery(filters);
        const filtersQuery = createFiltersQuery(filters);

        console.log('Executing optimized queries...');
        
        // Execute data query first with timeout handling
        const { data, error } = await dataQuery;

        if (error) {
          console.error("Error fetching data:", error);
          // Return empty results but don't throw
          return { 
            products: [], 
            totalCount: 0, 
            hasMore: false, 
            availableBrands: [], 
            availableStores: [] 
          };
        }

        console.log('Data query successful, length:', data?.length || 0);

        // Try to get filters data, but don't fail if it times out
        let filtersData = null;
        try {
          const filtersResult = await filtersQuery;
          if (!filtersResult.error) {
            filtersData = filtersResult.data;
          }
        } catch (filtersError) {
          console.warn("Filters query failed, continuing without filters:", filtersError);
        }

        // Transform the data
        const products: ProductView[] = (data || []).map(transformProductData);

        // Extract unique brands and stores (use data as fallback if filtersData failed)
        const { availableBrands, availableStores } = extractUniqueFilters(filtersData || data);

        // Simple pagination logic
        const hasMore = products.length === pageSize;
        const estimatedTotal = hasMore ? (page * pageSize + 1) : ((page - 1) * pageSize + products.length);

        console.log('Final results:', { 
          productsCount: products.length, 
          estimatedTotal, 
          hasMore, 
          page,
          pageSize,
          availableBrandsCount: availableBrands.length,
          availableStoresCount: availableStores.length 
        });

        return { 
          products, 
          totalCount: estimatedTotal, 
          hasMore, 
          availableBrands, 
          availableStores 
        };

      } catch (error) {
        console.error("Error in products query:", error);
        return { 
          products: [], 
          totalCount: 0, 
          hasMore: false, 
          availableBrands: [], 
          availableStores: [] 
        };
      }
    },
    staleTime: 5 * 60 * 1000,
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

// Export types for external use
export type { ProductView, ProductsResponse } from "@/types/product";
