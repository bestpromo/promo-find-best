
import { useQuery } from "@tanstack/react-query";
import type { ProductView, ProductsResponse, ProductFilters } from "@/types/product";
import { createDataQuery, createFiltersQuery, createTestQuery, createCountQuery, createDebugQuery } from "@/utils/productQueries";
import { transformProductData, extractUniqueFilters } from "@/utils/productTransformers";
import { supabase } from "@/integrations/supabase/client";

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

        // Step 1: Test very basic connectivity
        console.log('Step 1: Testing basic database connectivity...');
        const debugResult = await createDebugQuery();
        console.log('Debug result status:', { 
          error: debugResult.error, 
          dataLength: debugResult.data?.length,
          status: debugResult.status,
          statusText: debugResult.statusText
        });
        
        if (debugResult.error) {
          console.error('CRITICAL: Database connection failed:', debugResult.error);
          return { products: [], totalCount: 0, hasMore: false, availableBrands: [], availableStores: [] };
        }

        if (!debugResult.data || debugResult.data.length === 0) {
          console.error('CRITICAL: No data found in offer_search table');
          return { products: [], totalCount: 0, hasMore: false, availableBrands: [], availableStores: [] };
        }

        console.log('✅ Database connection OK! Sample data found:', debugResult.data.length, 'records');
        console.log('First record structure:', Object.keys(debugResult.data[0] || {}));

        // Step 2: Try to get a simple count of all records
        console.log('Step 2: Getting total record count...');
        const { count } = await supabase
          .from('offer_search')
          .select('*', { count: 'exact', head: true });
        
        console.log('Total records in table:', count);

        // Step 3: Try simple query without any filters
        console.log('Step 3: Testing simple query without filters...');
        const simpleQuery = supabase
          .from('offer_search')
          .select('*')
          .order('title', { ascending: true })
          .range(0, pageSize - 1);

        const simpleResult = await simpleQuery;
        console.log('Simple query result:', {
          error: simpleResult.error,
          dataLength: simpleResult.data?.length,
          status: simpleResult.status
        });

        if (simpleResult.error) {
          console.error('Simple query failed:', simpleResult.error);
          return { products: [], totalCount: 0, hasMore: false, availableBrands: [], availableStores: [] };
        }

        if (!simpleResult.data || simpleResult.data.length === 0) {
          console.error('No data returned from simple query');
          return { products: [], totalCount: 0, hasMore: false, availableBrands: [], availableStores: [] };
        }

        console.log('✅ Simple query successful! Found', simpleResult.data.length, 'products');

        // Step 4: Apply search filter if needed
        let finalQuery = supabase.from('offer_search').select('*');
        
        if (searchQuery && searchQuery.trim()) {
          console.log('Step 4: Applying search filter for:', searchQuery);
          finalQuery = finalQuery.ilike('title', `%${searchQuery.trim()}%`);
        }

        // Apply sorting
        switch (sortBy) {
          case 'price-desc':
            finalQuery = finalQuery.order('sale_price', { ascending: false });
            break;
          case 'price-asc':
            finalQuery = finalQuery.order('sale_price', { ascending: true });
            break;
          case 'nome-desc':
            finalQuery = finalQuery.order('title', { ascending: false });
            break;
          case 'nome-asc':
          default:
            finalQuery = finalQuery.order('title', { ascending: true });
            break;
        }

        // Apply pagination
        const from = (page - 1) * pageSize;
        const to = from + pageSize - 1;
        finalQuery = finalQuery.range(from, to);

        console.log('Executing final query with pagination:', { from, to });
        const finalResult = await finalQuery;

        console.log('Final query result:', {
          error: finalResult.error,
          dataLength: finalResult.data?.length,
          status: finalResult.status
        });

        if (finalResult.error) {
          console.error('Final query failed:', finalResult.error);
          // Fallback to simple result if final query fails
          const products: ProductView[] = simpleResult.data.map(transformProductData);
          return {
            products: products.slice(0, pageSize),
            totalCount: count || products.length,
            hasMore: (count || products.length) > pageSize,
            availableBrands: [],
            availableStores: []
          };
        }

        // Transform products
        const products: ProductView[] = (finalResult.data || []).map(transformProductData);
        console.log('Transformed products:', products.length);

        // Get brands and stores for filters
        const filtersData = searchQuery && searchQuery.trim() ? finalResult.data : simpleResult.data;
        const { availableBrands, availableStores } = extractUniqueFilters(filtersData || []);

        const hasMore = (page * pageSize) < (count || 0);

        const result = {
          products,
          totalCount: count || 0,
          hasMore,
          availableBrands,
          availableStores
        };

        console.log('=== FINAL RESULT ===');
        console.log('Products returned:', result.products.length);
        console.log('Total count:', result.totalCount);
        console.log('Has more:', result.hasMore);
        console.log('Available brands:', result.availableBrands.length);
        console.log('Available stores:', result.availableStores.length);

        return result;

      } catch (error) {
        console.error("CRITICAL ERROR in products query:", error);
        return { products: [], totalCount: 0, hasMore: false, availableBrands: [], availableStores: [] };
      }
    },
    staleTime: 5 * 60 * 1000,
    retry: 1,
    retryDelay: 1000,
  });
};

// Export types for external use
export type { ProductView, ProductsResponse } from "@/types/product";
