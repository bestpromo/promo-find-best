
import { useQuery } from "@tanstack/react-query";
import type { ProductView, ProductsResponse, ProductFilters } from "@/types/product";
import { createDataQuery, createFiltersQuery, createTestQuery } from "@/utils/productQueries";
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
        console.log('=== STARTING PRODUCTS QUERY ===');
        console.log('Query params:', { searchQuery, sortBy, page, pageSize, brandFilter, priceRange, storeFilter });

        // First, test basic connectivity
        console.log('Testing database connectivity...');
        const testResult = await createTestQuery();
        console.log('Test query result:', testResult);
        
        if (testResult.error) {
          console.error('Database connectivity test failed:', testResult.error);
          return { 
            products: [], 
            totalCount: 0, 
            hasMore: false, 
            availableBrands: [], 
            availableStores: [] 
          };
        }

        console.log('Database connectivity OK, found', testResult.data?.length || 0, 'test records');

        const filters: ProductFilters = {
          searchQuery,
          sortBy,
          page,
          pageSize,
          brandFilter,
          priceRange,
          storeFilter
        };

        // Create queries
        const dataQuery = createDataQuery(filters);
        const filtersQuery = createFiltersQuery(filters);

        console.log('Executing main data query...');
        
        // Execute data query
        const { data, error, count } = await dataQuery;

        console.log('Data query completed');
        console.log('- Error:', error);
        console.log('- Data length:', data?.length || 0);
        console.log('- Count:', count);

        if (error) {
          console.error("Supabase query error:", error);
          console.error("Error details:", {
            code: error.code,
            message: error.message,
            details: error.details,
            hint: error.hint
          });
          
          return { 
            products: [], 
            totalCount: 0, 
            hasMore: false, 
            availableBrands: [], 
            availableStores: [] 
          };
        }

        console.log('Data query successful, processing results...');

        // Try to get filters data
        let filtersData = null;
        try {
          console.log('Executing filters query...');
          const filtersResult = await filtersQuery;
          console.log('Filters query result:', {
            error: filtersResult.error,
            dataLength: filtersResult.data?.length || 0
          });
          
          if (!filtersResult.error) {
            filtersData = filtersResult.data;
          }
        } catch (filtersError) {
          console.warn("Filters query failed:", filtersError);
        }

        // Transform the data
        const products: ProductView[] = (data || []).map(transformProductData);
        console.log('Transformed products:', products.length);

        // Extract unique brands and stores
        const { availableBrands, availableStores } = extractUniqueFilters(filtersData || data);
        console.log('Extracted filters:', { 
          brandsCount: availableBrands.length, 
          storesCount: availableStores.length 
        });

        // Simple pagination logic
        const hasMore = products.length === pageSize;
        const estimatedTotal = hasMore ? (page * pageSize + 1) : ((page - 1) * pageSize + products.length);

        const result = { 
          products, 
          totalCount: estimatedTotal, 
          hasMore, 
          availableBrands, 
          availableStores 
        };

        console.log('=== FINAL RESULT ===');
        console.log('Products:', result.products.length);
        console.log('Total count:', result.totalCount);
        console.log('Has more:', result.hasMore);
        console.log('Available brands:', result.availableBrands.length);
        console.log('Available stores:', result.availableStores.length);

        return result;

      } catch (error) {
        console.error("Unexpected error in products query:", error);
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
    retry: 1, // Reduce retries to see errors faster
    retryDelay: 1000,
  });
};

// Export types for external use
export type { ProductView, ProductsResponse } from "@/types/product";
