
import { useQuery } from "@tanstack/react-query";
import type { ProductView, ProductsResponse, ProductFilters } from "@/types/product";
import { createDataQuery, createFiltersQuery, createTestQuery, createCountQuery, createDebugQuery } from "@/utils/productQueries";
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

        // First, test basic connectivity and table structure
        console.log('Testing database connectivity and getting sample data...');
        const debugResult = await createDebugQuery();
        console.log('Debug query result:', debugResult);
        
        if (debugResult.error) {
          console.error('Database debug test failed:', debugResult.error);
          return { 
            products: [], 
            totalCount: 0, 
            hasMore: false, 
            availableBrands: [], 
            availableStores: [] 
          };
        }

        console.log('Database connectivity OK, sample data:', debugResult.data);
        console.log('Sample record structure:', debugResult.data?.[0]);

        // Test basic query without search
        console.log('Testing basic query without search...');
        const testResult = await createTestQuery();
        console.log('Test query result:', testResult);
        
        if (testResult.error) {
          console.error('Basic query test failed:', testResult.error);
          return { 
            products: [], 
            totalCount: 0, 
            hasMore: false, 
            availableBrands: [], 
            availableStores: [] 
          };
        }

        console.log('Basic query OK, found', testResult.data?.length || 0, 'test records');

        const filters: ProductFilters = {
          searchQuery,
          sortBy,
          page,
          pageSize,
          brandFilter,
          priceRange,
          storeFilter
        };

        // If no search query, try to get all products first
        if (!searchQuery || !searchQuery.trim()) {
          console.log('No search query provided, getting all products...');
          
          // Create a simple query for all products
          const allProductsQuery = createDataQuery({
            ...filters,
            searchQuery: '' // Remove search query
          });
          
          const allProductsResult = await allProductsQuery;
          console.log('All products query result:', allProductsResult);
          
          if (allProductsResult.data) {
            const products: ProductView[] = allProductsResult.data.map(transformProductData);
            return {
              products,
              totalCount: products.length,
              hasMore: false,
              availableBrands: [],
              availableStores: []
            };
          }
        }

        // Create queries
        console.log('Creating filtered queries...');
        const dataQuery = createDataQuery(filters);
        const countQuery = createCountQuery(filters);
        const filtersQuery = createFiltersQuery(filters);

        console.log('Executing queries in parallel...');
        
        // Execute queries in parallel
        const [dataResult, countResult, filtersResult] = await Promise.all([
          dataQuery,
          countQuery,
          filtersQuery
        ]);

        console.log('All queries completed');
        console.log('- Data error:', dataResult.error);
        console.log('- Data length:', dataResult.data?.length || 0);
        console.log('- Count error:', countResult.error);
        console.log('- Real count:', countResult.count);
        console.log('- Filters error:', filtersResult.error);
        console.log('- Filters length:', filtersResult.data?.length || 0);

        if (dataResult.error) {
          console.error("Data query error:", dataResult.error);
          console.error("Data query details:", dataResult);
          return { 
            products: [], 
            totalCount: 0, 
            hasMore: false, 
            availableBrands: [], 
            availableStores: [] 
          };
        }

        // Get the real total count
        const realTotalCount = countResult.count || 0;
        console.log('Real total count from database:', realTotalCount);

        // Transform the data
        const products: ProductView[] = (dataResult.data || []).map(transformProductData);
        console.log('Transformed products:', products.length);

        // Extract unique brands and stores from filters query
        const filtersData = filtersResult.error ? [] : (filtersResult.data || []);
        const { availableBrands, availableStores } = extractUniqueFilters(filtersData);
        console.log('Extracted filters from', filtersData.length, 'records:', { 
          brandsCount: availableBrands.length, 
          storesCount: availableStores.length 
        });

        // Calculate if there are more pages
        const hasMore = (page * pageSize) < realTotalCount;

        const result = { 
          products, 
          totalCount: realTotalCount, 
          hasMore, 
          availableBrands, 
          availableStores 
        };

        console.log('=== FINAL RESULT ===');
        console.log('Products:', result.products.length);
        console.log('Real total count:', result.totalCount);
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
    retry: 1,
    retryDelay: 1000,
  });
};

// Export types for external use
export type { ProductView, ProductsResponse } from "@/types/product";
