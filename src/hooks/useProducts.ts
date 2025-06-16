
import { useQuery } from "@tanstack/react-query";
import type { ProductView, ProductsResponse, ProductFilters } from "@/types/product";
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

        // Helper function to apply all filters to a query
        const applyFilters = (query: any) => {
          // Apply search filter
          if (searchQuery && searchQuery.trim()) {
            console.log('Applying search filter for:', searchQuery);
            query = query.ilike('title', `%${searchQuery.trim()}%`);
          }

          // Apply brand filter
          if (brandFilter && brandFilter.length > 0) {
            console.log('Applying brand filter:', brandFilter);
            query = query.in('brand_name', brandFilter);
          }

          // Apply store filter
          if (storeFilter && storeFilter.length > 0) {
            console.log('Applying store filter:', storeFilter);
            query = query.in('store_name', storeFilter);
          }

          // Apply price range filter
          if (priceRange && (priceRange.min > 0 || priceRange.max < 1000)) {
            console.log('Applying price range filter:', priceRange);
            query = query.gte('sale_price', priceRange.min).lte('sale_price', priceRange.max);
          }

          return query;
        };

        // Get count with all filters applied
        console.log('Getting filtered count...');
        let countQuery = supabase
          .from('offer_search')
          .select('*', { count: 'exact', head: true });
        
        countQuery = applyFilters(countQuery);
        const { count, error: countError } = await countQuery;

        if (countError) {
          console.error('Count query failed:', countError);
          return { products: [], totalCount: 0, hasMore: false, availableBrands: [], availableStores: [] };
        }

        console.log('Filtered count result:', count);

        // Get data with all filters applied
        let dataQuery = supabase.from('offer_search').select('*');
        dataQuery = applyFilters(dataQuery);

        // Apply sorting
        switch (sortBy) {
          case 'price-desc':
            dataQuery = dataQuery.order('sale_price', { ascending: false });
            break;
          case 'price-asc':
            dataQuery = dataQuery.order('sale_price', { ascending: true });
            break;
          case 'nome-desc':
            dataQuery = dataQuery.order('title', { ascending: false });
            break;
          case 'nome-asc':
          default:
            dataQuery = dataQuery.order('title', { ascending: true });
            break;
        }

        // Apply pagination
        const from = (page - 1) * pageSize;
        const to = from + pageSize - 1;
        dataQuery = dataQuery.range(from, to);

        console.log('Executing data query with pagination:', { from, to });
        const dataResult = await dataQuery;

        console.log('Data query result:', {
          error: dataResult.error,
          dataLength: dataResult.data?.length,
          status: dataResult.status
        });

        if (dataResult.error) {
          console.error('Data query failed:', dataResult.error);
          return { products: [], totalCount: 0, hasMore: false, availableBrands: [], availableStores: [] };
        }

        // Transform products
        const products: ProductView[] = (dataResult.data || []).map(transformProductData);
        console.log('Transformed products:', products.length);

        // Get available filters based on search only (not filtered by current selections)
        let filtersQuery = supabase.from('offer_search').select('brand_name, store_name');
        if (searchQuery && searchQuery.trim()) {
          filtersQuery = filtersQuery.ilike('title', `%${searchQuery.trim()}%`);
        }

        const filtersResult = await filtersQuery;
        const { availableBrands, availableStores } = extractUniqueFilters(filtersResult.data || []);

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
        console.log('Total count (filtered):', result.totalCount);
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
